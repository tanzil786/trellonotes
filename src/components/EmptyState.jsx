import React from "react";

import { Card } from "react-bootstrap";
function EmptyState({
  subtitle,
  className,
  title = "No data found",
  img = "images/empty-state.svg",
}) {
  return (
    <Card
      className={`d-flex align-items-center justify-content-center full-width ${className}`}
    >
      <div className="text-center pb-4 mb-5" style={{ maxWidth: "250px" }}>
        <img alt="empty state" src={img} />
        {!!title && <div className="h5">{title}</div>}
        {!!subtitle && <div className="font-weight-light">{subtitle}</div>}
      </div>
    </Card>
  );
}

export default EmptyState;
