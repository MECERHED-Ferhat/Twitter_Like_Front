const errorStyle = { margin: "auto" };

export function ErrorDefault() {
  return <div style={errorStyle}>A problem happened. Please try later</div>;
}

export function Error404() {
  return <div style={errorStyle}>Error 404, Page not found</div>;
}
