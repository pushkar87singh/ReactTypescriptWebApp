import React, { useState, useEffect } from "react";
import { ReactComponentLike } from "prop-types";

export const ResponsiveLayoutContext = React.createContext(false);

const setViewportContent = async (content: string) => {
  try {
    const viewport = document.querySelector(
      "meta[name=viewport]"
    ) as HTMLElement;
    viewport.setAttribute("content", content);
  } catch (_) {
    /* istanbul ignore next */
    return;
  }
};

const ResponsiveLayout: ReactComponentLike = ({ disabled, children }) => {
  const [isResponsive, setIsResponsive] = useState<null | boolean>(null);
  const shouldBeResponsive = true;

  const stateUnknown = isResponsive === null;
  useEffect(() => {
    if (shouldBeResponsive && (stateUnknown || isResponsive === false)) {
      setViewportContent(
        "width=device-width, initial-scale=1, shrink-to-fit=no"
      ).then(() => {
        setIsResponsive(true);
      });
    }
  });

  return (
    <ResponsiveLayoutContext.Provider value={disabled || false}>
      {children}
    </ResponsiveLayoutContext.Provider>
  );
};

export default ResponsiveLayout;
