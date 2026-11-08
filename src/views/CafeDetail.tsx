import { Link, useParams, useLocation } from "react-router";
import { money } from "../lib/api";
import { useApi } from "../lib/useApi";
import type { Cafe, Review } from "../lib/api";
import { Empty, Icon, Loading, Notice, SaveButton } from "../components/Common";
export function ReviewCard({
  review,
  children,
}: {
  review: Review;
  children?: React.ReactNode;
}) {
  return (
    <article className="review-card">
      <div className="review-person">
        <span className="avatar">{review.author[0].toUpperCase()}</span>
        <div>
          <strong>{review.author}</strong>
          <small>
            {new Date(
              review.created.replace(" ", "T") + "Z",
            ).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </small>
        </div>
      </div>
      <div className="review-content">
        <h3>{review.title}</h3>
        <p>{review.body}</p>
        {children}
      </div>
<div className="review-ratings">
  {[
    { label: "Coffee", score: review.coffee },
    { label: "Atmosphere", score: review.atmosphere },
    { label: "Service", score: review.service },
  ].map(({ label, score }) => (
    <span
      className="rating"
      key={label}
      aria-label={`${label} rating ${score} out of 5`}
    >
      <Icon name="starSmall" />
      {label}: {score}/5
    </span>
  ))}
</div>
    </article>
  );
}
export function CafeDetail() {
  const { id } = useParams(),
    location = useLocation();
  const { data, error, retry } = useApi<{ cafe: Cafe; reviews: Review[] }>(
    "/cafes/" + id,
  );
  if (error)
    return (
      <div className="page-shell">
        <Empty title="We couldn't load this café.">
          <Notice>{error}</Notice>
          <button className="btn btn-primary" onClick={retry}>
            Try again
          </button>{" "}
          <Link to="/cafes">Back to cafés</Link>
        </Empty>
      </div>
    );
  if (!data) return <Loading />;
  const { cafe, reviews } = data;
  return (
    <div className="page-shell detail-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/cafes">Discover</Link>
        <span>/</span>
        <span>{cafe.suburb}</span>
        <span>/</span>
        <span>{cafe.name}</span>
      </nav>
      {location.state?.saved && (
        <div className="success" role="status">
          Your review has been saved. Thanks for sharing your ritual.
        </div>
      )}
      <section className="detail-hero">
        <img
          className="detail-photo"
          src={cafe.image}
          alt={cafe.name + " coffee"}
        />
        <div className="detail-intro">
          <p className="eyebrow">{cafe.suburb}, Melbourne</p>
          <h1>{cafe.name}</h1>
          <div className="rating-line">
            <span className="rating">
              <Icon name="star" />
              {cafe.rating?.toFixed(1) ?? "New"}
              {cafe.rating !== null ? " coffee" : ""}
            </span>
            <small>
              {cafe.reviewCount} review{cafe.reviewCount === 1 ? "" : "s"}
            </small>
          </div>
          <p>{cafe.description}</p>
          <div className="filter-list">
            {cafe.style.split(" + ").map((s) => (
              <span className="tag" key={s}>
                {s}
              </span>
            ))}
          </div>
          <div className="detail-actions">
            <Link
              to={"/cafes/" + cafe.id + "/review"}
              className="btn btn-primary"
            >
              Write a review
            </Link>
            <SaveButton id={cafe.id} />
          </div>
        </div>
      </section>
      <section className="detail-section">
        <h2>The coffee</h2>
        <div className="metadata-grid">
          {[
            ["Bean origin", cafe.origin],
            ["Roast", cafe.roast],
            ["Tasting notes", cafe.notes],
            [
              "Price range",
              money(cafe.priceFrom) + "–" + money(cafe.priceTo) + " AUD",
            ],
          ].map(([k, v]) => (
            <div className="metadata" key={k}>
              <p className="eyebrow muted">{k}</p>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
        <p className="coffee-description">{cafe.coffeeDescription}</p>
      </section>
      <section className="detail-section">
        <h2>Community reviews</h2>
        <div className="score-grid">
          {[
            ["Coffee", cafe.rating],
            ["Atmosphere", cafe.atmosphereRating],
            ["Service", cafe.serviceRating],
          ].map(([name, score]) => (
            <div className="score" key={name}>
              <strong>{name}</strong>
              <div>
                <span>
                  {typeof score === "number" ? score.toFixed(1) : "—"}
                </span>
                <small>
                  {typeof score === "number" ? "out of 5" : "No ratings yet"}
                </small>
              </div>
            </div>
          ))}
        </div>
        {reviews.length ? (
          reviews.map((r) => <ReviewCard key={r.id} review={r} />)
        ) : (
          <Empty title="Be the first to share a cup.">
            <p>Your coffee story could be someone's next discovery.</p>
            <Link to={"/cafes/" + cafe.id + "/review"}>Write a review</Link>
          </Empty>
        )}
      </section>
    </div>
  );
}
