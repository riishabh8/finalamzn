import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import "./plans.css";
import Profile from "./Profile";
export default function Plans() {
  // const []
  let plan = "Weekly Plan ₹49";
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("NA");
  const [lastName, setLastname] = useState("NA");

  const [sendProduct, setsendProduct] = useState({
    name: "Weekly subscription plan",
    price: 49,
    productBy: "amazon",
  });
  const [product, setProduct] = useState({
    name: "Weekly subscription plan",
    price: 49,
    productBy: "amazon",
  });

  const [product1, setProduct1] = useState({
    name: "Monthly subscription plan",
    price: 129,
    productBy: "amazon",
  });
  const [product2, setProduct2] = useState({
    name: "Basic subscription plan",
    price: 1339,
    productBy: "amazon",
  });

  const GetData = () => {
    const url = "https://finalamzn.herokuapp.com/api/users/me";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        setEmail(res.email);
      })
      .catch((err) => {
        window.location = "/";
      });
  };

  const PostData = () => {
    const url = "https://finalamzn.herokuapp.com/api/users/me";

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      plan: plan,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const UpdateInfo = () => {
      fetch(url, requestOptions)
        .then((response) => {
          if (response.status === 204) {
            window.location = "/profile";
          } else if (response.status === 401) {
            alert("Session Expired");
            window.location = "/login";
          }
        })
        .catch((err) => {
          console.log(`error:${err}`);
        });
    };
    UpdateInfo();
  };

  const makePayment = (token) => {
    const body = {
      token,
      sendProduct: sendProduct,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`https://finalamzn.herokuapp.com/api/payments`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);
        const { status } = response;
        console.log("STATUS ", status);
        PostData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makePayment1 = (token) => {
    const body = {
      token,
      sendProduct: product1,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`https://finalamzn.herokuapp.com/api/payments`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);
        const { status } = response;
        console.log("STATUS ", status);
        plan = `Monthly Plan ₹129`;
        PostData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makePayment2 = (token) => {
    const body = {
      token,
      sendProduct: product2,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`https://finalamzn.herokuapp.com/api/payments`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response", response);
        const { status } = response;
        console.log("STATUS ", status);
        plan = `Monthly Plan ₹1339`;
        PostData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  GetData();

  return (
    <div>
      <a href="/profile">
        <img
          src="https://amazonprime-clone.netlify.app/static/media/Primelogo.f29008c018626f7405ee4614ab72e6b6.svg"
          alt="prime"
          className="prime-img"
        />
      </a>
      <div className="parentCard">
        <div className="container--card">
          <h2>Weekly Plan</h2>
          <h3>₹{product.price}</h3>
          <p>Unlimited movies and tv</p>
          <p></p>
          <p></p>
          <StripeCheckout
            stripeKey="pk_test_51JMYvaSFCgqg44DgIhNEzGA0pezmk9ShAjj1FCVqn6s6OaJl1A0RX72E9WfLNLM1AgCsK28KtNcdoVdXBS642qFd00izwe7V3u"
            token={makePayment}
            name="Buy Subscription"
            amount={product.price * 100}
            shippingAddress
            currency="inr"
          >
            <button className="view--plan">Get a subscription</button>
          </StripeCheckout>
        </div>
        <div className="container--card">
          <h2>Monthly Plan</h2>
          <h3>₹{product1.price}</h3>
          <p>Unlimited movies and tv</p>
          <p>Free 2 day shipping</p>
          <p></p>
          <StripeCheckout
            stripeKey="pk_test_51JMYvaSFCgqg44DgIhNEzGA0pezmk9ShAjj1FCVqn6s6OaJl1A0RX72E9WfLNLM1AgCsK28KtNcdoVdXBS642qFd00izwe7V3u"
            token={makePayment1}
            name="Buy Subscription"
            amount={product1.price * 100}
            shippingAddress
            currency="inr"
          >
            <button className="view--plan">Get a subscription </button>
          </StripeCheckout>
        </div>
        <div className="container--card">
          <h2>Yearly Plan</h2>
          <h3>₹{product2.price}</h3>
          <p>Unlimited movies and tv</p>
          <p>Free 2 day shipping</p>
          <p>Unlimited music streaming</p>
          <StripeCheckout
            stripeKey="pk_test_51JMYvaSFCgqg44DgIhNEzGA0pezmk9ShAjj1FCVqn6s6OaJl1A0RX72E9WfLNLM1AgCsK28KtNcdoVdXBS642qFd00izwe7V3u"
            token={makePayment2}
            name="Buy Subscription"
            amount={product2.price * 100}
            shippingAddress
            currency="inr"
          >
            <button className="view--plan">Get a subscription</button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}
