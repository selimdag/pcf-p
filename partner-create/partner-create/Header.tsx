import * as React from "react";
import {Stack, Text } from "@fluentui/react";
import HdiLogo from "./assets/hdi_logo";
import { IIconProps } from '@fluentui/react';
import { ActionButton } from '@fluentui/react/lib/Button';

const addFriendIcon: IIconProps = { iconName: 'Cancel' };

const Header = (): JSX.Element => {
  return (
    <div className="hdi_header">
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center" tokens={{ childrenGap: 16 }} style={{ padding: '0 20px', width: "100%" }}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
        <HdiLogo />
        <Stack style={{padding: "0 10px",borderRight: "solid 1px lightgrey"}}>
          <Text style={{ color: "grey" }} variant="large">HDI Global Sales</Text>
        </Stack>
        <Stack style={{padding: "0 8px"}}>
          <Text  variant="xLarge">Create New Partner</Text>
          </Stack>
      </Stack>
      <ActionButton iconProps={addFriendIcon} allowDisabledFocus>
        Close
      </ActionButton>
    </Stack>
    </div>
  );
};

export default Header;
