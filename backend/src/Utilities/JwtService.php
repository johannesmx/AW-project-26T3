<?php
namespace App\Backend\Utilities;

use RuntimeException;

class JwtService
{
    private string $secret;
    private int $ttlSeconds;

    public function __construct(?string $secret = null, int $ttlSeconds = 86400)
    {
        $envSecret = $secret ?? ($_ENV['JWTKEY'] ?? getenv('JWTKEY') ?: '');
        if ($envSecret === '' || strlen($envSecret) < 32) {
            throw new RuntimeException('JWTKEY must be configured and at least 32 characters long.');
        }
        $this->secret = $envSecret;
        $this->ttlSeconds = $ttlSeconds;
    }

    public function issueToken(array $claims): string
    {
        $now = time();
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = array_merge($claims, [
            'iat' => $now,
            'exp' => $now + $this->ttlSeconds,
        ]);

        $encodedHeader = $this->base64UrlEncode(json_encode($header, JSON_THROW_ON_ERROR));
        $encodedPayload = $this->base64UrlEncode(json_encode($payload, JSON_THROW_ON_ERROR));
        $signature = hash_hmac('sha256', "{$encodedHeader}.{$encodedPayload}", $this->secret, true);

        return "{$encodedHeader}.{$encodedPayload}." . $this->base64UrlEncode($signature);
    }

    public function verifyToken(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$encodedHeader, $encodedPayload, $encodedSignature] = $parts;
        $expectedSig = $this->base64UrlEncode(
            hash_hmac('sha256', "{$encodedHeader}.{$encodedPayload}", $this->secret, true)
        );

        if (!hash_equals($expectedSig, $encodedSignature)) {
            return null;
        }

        $header = json_decode($this->base64UrlDecode($encodedHeader), true);
        if (!is_array($header) || ($header['alg'] ?? '') !== 'HS256') {
            return null;
        }

        $payload = json_decode($this->base64UrlDecode($encodedPayload), true);
        if (!is_array($payload) || !isset($payload['exp']) || time() >= (int) $payload['exp']) {
            return null;
        }

        return $payload;
    }

    public function setAuthCookie(string $token): void
    {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (($_SERVER['SERVER_PORT'] ?? '') === '443');

        setcookie('auth_token', $token, [
            'expires' => time() + $this->ttlSeconds,
            'path' => '/',
            'domain' => '',
            'secure' => $isHttps,     // true in HTTPS production; false for plain http://localhost
            'httponly' => true,     // inaccessible to JS (mitigates XSS token theft)
            'samesite' => $isHttps ? 'None' : 'Lax',
        ]);
    }

    public function clearAuthCookie(): void
    {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (($_SERVER['SERVER_PORT'] ?? '') === '443');

        setcookie('auth_token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'domain' => '',
            'secure' => $isHttps,
            'httponly' => true,
            'samesite' => $isHttps ? 'None' : 'Lax',
        ]);
    }

    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private function base64UrlDecode(string $data): string
    {
        $remainder = strlen($data) % 4;
        if ($remainder > 0) {
            $data .= str_repeat('=', 4 - $remainder);
        }
        return (string) base64_decode(strtr($data, '-_', '+/'), true);
    }
}