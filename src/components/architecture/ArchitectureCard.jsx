import React from 'react';
import { architectureAssets } from './architectureAssets';

export default function ArchitectureCard({
  type,
  stepNumber,
  stepBadge,
  title,
  description,
  metric,
  engineImage,
  engineAlt,
  children,
  className = '',
}) {
  const legacyIdMap = {
    generate: 'prop-card-top',
    control: 'prop-card-left',
    consume: 'prop-card-right',
  };
  const cardId = legacyIdMap[type] || `prop-card-${type}`;

  return (
    <div
      className={`arch-card arch-card--${type} arch-card-${type} ${className}`}
      id={cardId}
      data-card-type={type}
    >
      {/* 3D Organic Glass Card Substrate */}
      <img
        src={architectureAssets.cardBg}
        alt=""
        className="arch-card__bg"
        aria-hidden="true"
        draggable="false"
      />

      <div className="arch-card__content">
        <div className="arch-card__info">
          <div className="arch-card__header-badge">
            <span className="arch-card__step-num">{stepNumber}</span>
            <span className="arch-card__step-name">{stepBadge}</span>
          </div>
          <h3 className="arch-card__title">{title}</h3>
          <p className="arch-card__desc">{description}</p>
          {metric && <div className="arch-card__metric-pill">{metric}</div>}
        </div>

        <div className="arch-card__visual">
          {children}
          <img
            src={engineImage}
            alt={engineAlt || title}
            className={`arch-card__engine-img arch-card__engine-img--${type}`}
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
