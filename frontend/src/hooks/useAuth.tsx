import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export type AuthUser = {
  Id: number
  Email: string
  Name: string
}

type ApiResponse<T> = {
  success: boolean
  error: string | null
  data: T
}

type AuthPayload = {
  user?: AuthUser
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  initializing: boolean
  submitting: boolean
  error: string | null
  register: (username: string, email: string, password: string) => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshSession: (signal?: AbortSignal) => Promise<AuthUser | null>
}

const API_BASE_URL = ''

const AuthContext = createContext<AuthContextValue | null>(null)

async function postAuth<TBody extends Record<string, string>>(
  path: string,
  body: TBody
): Promise<{ ok: boolean; payload: ApiResponse<AuthPayload> }> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  })

  const payload: ApiResponse<AuthPayload> = await response.json()
  return { ok: response.ok && payload.success, payload }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [initializing, setInitializing] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const refreshSession = useCallback(async (signal?: AbortSignal): Promise<AuthUser | null> => {
    setInitializing(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        credentials: 'include',
        signal,
      })

      if (!response.ok) {
        setUser(null)
        return null
      }

      const payload: ApiResponse<AuthPayload> = await response.json()
      if (payload.success && payload.data?.user) {
        setUser(payload.data.user)
        return payload.data.user
      }

      setUser(null)
      return null
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return null
      }
      setUser(null)
      return null
    } finally {
      if (!signal?.aborted) {
        setInitializing(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    refreshSession(controller.signal)
    return () => controller.abort()
  }, [refreshSession])

  const register = useCallback(
    async (username: string, email: string, password: string): Promise<boolean> => {
      setSubmitting(true)
      setError(null)
      try {
        const { ok, payload } = await postAuth('/api/register', { username, email, password })
        if (!ok || !payload.data?.user) {
          setError(payload.error || 'Registration failed.')
          setUser(null)
          return false
        }
        setUser(payload.data.user)
        return true
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error during registration.')
        setUser(null)
        return false
      } finally {
        setSubmitting(false)
      }
    },
    []
  )

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const { ok, payload } = await postAuth('/api/login', { email, password })
      if (!ok || !payload.data?.user) {
        setError(payload.error || 'Login failed.')
        setUser(null)
        return false
      }
      setUser(payload.data.user)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error during login.')
      setUser(null)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    setSubmitting(true)
    setError(null)
    try {
      await fetch(`${API_BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      setUser(null)
      setSubmitting(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        initializing,
        submitting,
        error,
        register,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}