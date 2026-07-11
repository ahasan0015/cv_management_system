import { useEffect } from "react";
import { Tooltip } from "bootstrap";

export default function useBootstrapTooltip(
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    const tooltips = Array.from(elements).map(
      (el) => new Tooltip(el)
    );

    return () => {
      tooltips.forEach((tooltip) => tooltip.dispose());
    };
  }, dependencies);
}