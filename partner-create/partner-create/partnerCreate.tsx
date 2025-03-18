import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { IStackTokens } from "@fluentui/react/lib/Stack";
import Header from "./Header";
import Footer from "./Footer";
import TabControl from "./TabControl";
import { useState } from "react";

export interface IPartnerProps {
  update: (value: string | null) => void;
  context: ComponentFramework.Context<IInputs>;
}

//set this to true to retreive mock data from entities.json
const localDev = !true;

const stackTokens: Partial<IStackTokens> = { childrenGap: 20 };

const PartnerCreateApp = (props: IPartnerProps): JSX.Element => {
 const [selectedKey, setSelectedKey] = useState(4);
 const handleNextStep = () => {
    setSelectedKey((selectedKey + 1) % 5);
  };
  
  const handlePrevStep = () => {
    if(selectedKey === 0) return;
    setSelectedKey((selectedKey - 1) % 5);
  };

  const handleStep = (step: number) => {
    if(step === selectedKey || step > 4 || step < 0) return;
    setSelectedKey(step);
  };

  return (
    <>
    <Header />
    <TabControl context={props.context} selectedKey={selectedKey.toString()} onhandleStep={handleStep} onPrevStep={handlePrevStep} onNextStep={handleNextStep}/>
    </>
  );
};

export default PartnerCreateApp;
