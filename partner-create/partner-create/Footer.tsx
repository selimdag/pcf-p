import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { DefaultButton, PrimaryButton, Stack } from "@fluentui/react";
import { hdiButtonStyle } from "./styles";


interface FooterProps {
  config: {showNext: boolean, nextCustomText?: string, showPrev: boolean};
  onNextStep: () => void;
  onPrevStep: () => void;
}

const Footer = ({ onNextStep, onPrevStep, config }: FooterProps): JSX.Element => {


  return (
    <>
    <Stack horizontal tokens={{childrenGap: 16}} style={{background: "#faf9f8", padding: "16px 4px 16px 4px"}}>
      {config.showNext && (
        <Stack.Item style={{paddingLeft: "16px", marginRight: "0"}}>
          <PrimaryButton onClick={onNextStep} style={hdiButtonStyle} text={config.nextCustomText || "Next step"} />
        </Stack.Item>
      )}
      {config.showPrev && (
        <Stack.Item style={{paddingLeft: "16px", margin: "0"}}>
          <DefaultButton onClick={onPrevStep} text="Back" />
        </Stack.Item>
      )}
      <Stack.Item>
        <DefaultButton text="Cancel" />
      </Stack.Item>
      <Stack.Item grow style={{paddingRight: "16px", textAlign:"right"}}>
        <Text style={{color:"grey"}} variant="smallPlus">Create new partner in the APAC geo-zone of HDI Global SE (version 0.9.3)</Text>
      </Stack.Item>
    </Stack>
    </>
  );
};

export default Footer;
