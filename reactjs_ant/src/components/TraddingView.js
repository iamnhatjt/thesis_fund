import React from "react";
import { AdvancedChart } from "react-tradingview-embed";

const CRYPTO_COMPARE =
  "54c69a67adfc783963d3589c5a08a40a5d619b0f22b94b1c79df9acc9129c5ff";

const TradingView = () => {
  return (
    <>
      <AdvancedChart
        widgetProps={{
          symbol: "USDVND", // Specify the currency pair here
          theme: "light",
          save_image: true,
          interval: "ALL",
          style: "1",
        }}
      />
    </>
  );
};

export default TradingView;
