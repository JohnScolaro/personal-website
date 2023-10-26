"use client";

import { AwesomeButton } from "react-awesome-button";
import { ButtonType } from "react-awesome-button/dist/src/components/AwesomeButton";
import "react-awesome-button/dist/styles.css";

export default function WrappedAwesomeButton(props: ButtonType) {
  return <AwesomeButton {...props} />;
}
