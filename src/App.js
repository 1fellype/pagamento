import React, { useState, useEffect, useRef } from "react";

function App() {
  const [paid, setPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let paypalRef = useRef();

  const product = {
    price: 19.99,
    description: "Plano: Menu da Casa",
  }

  useEffect(() => {
    const script = document.createElement("script");
    const id = "AQdNQQ111WhAEa4UAEgfeH9mf3hTMTAPlY59gPyBhjDWAd6pRpuDXrl0LV8rSUh9IhpQOFXN4Qcafz31"
    script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${id}`

    script.addEventListener("load", () => setLoaded(true));

    document.body.appendChild(script);

    if (loaded) {
      function loadButtonsAndLogicAboutPayment() {
        setTimeout(() => {
          window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  description: product.description,
                  amount: {
                    currency_code: "BRL",
                    value: product.price
                  }
                }
              ]
              });
            },
            onApprove: async (_,actions) => {
              const order = await actions.order.capture();

              setPaid(true);

              console.log(order);
            }
          })
          .render(paypalRef);
        })
      }
      loadButtonsAndLogicAboutPayment();
    }
  })

  return (
    <>
    <div className="App">
      {paid ? (
        <div>
          <h1>Parabéns você comprou o Plano!</h1>
        </div>
      ) : (
        <>
        <h1>{product.description} por R${product.price}</h1>
        <div ref={v => (paypalRef = v)} />
        </>
      )}
    </div>
    </>
  );
}

export default App;
