import * as React from "react";
import { ComboBox, IComboBoxOption, Icon, IPivotItemProps, Label, Pivot, PivotItem, SelectableOptionMenuItemType, Separator, TextField } from "@fluentui/react";
import { Stack } from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";
import { useId } from "@fluentui/react-hooks";
import PartnerTypeStep from "./Steps/partnerTypeStep";
import SearchCompanyStep from "./Steps/searchCompanyStep";
import Footer from "./Footer";
import { resultContent } from "@fluentui/react/lib/components/FloatingPicker/PeoplePicker/PeoplePicker.scss";
import NameAdressStep from "./Steps/nameAdressStep";
import { IInputs } from "./generated/ManifestTypes";
import ReviewStep from "./Steps/reviewStep";
import TelecommunicationStep from "./Steps/TelecommunicationStep";

interface ITabControlProps {
  selectedKey: string;
  context: ComponentFramework.Context<IInputs>;
  onNextStep: () => void;
  onPrevStep: () => void;
  onhandleStep: (step: number) => void;
}

const hdi_grey = "#8a8886";
const hdi_green = "#016728";

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #E1DFDD",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  borderRadius: 4,
};

const tmpStyle: React.CSSProperties = {
  background: "#faf9f8", 
  padding: "16px 4px 0 4px"
};

const TabControl = (props: ITabControlProps): JSX.Element => {

  const { selectedKey } = props;

  const [curConfig, setCurConfig] = React.useState({ showNext: true, showPrev: false, nextCustomText: "" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formDataRef = React.useRef<{ [key: string]: any }>({
    partnerType: {key: "customer", text: "Customer"},
    tenant: {key: "HdiGlobalSe", text: "HDI Global SE"},
    geozone: {key: "emea", text: "EMEA"},
    location: {key: "002", text: "002 - Germany"},
    locationUnit: {key: "100", text: "100 - Berlin"},
    owner: {key: "12234", text: "TBD"},
    addressType:  { key: '0', text: 'Street adress' },
  });
  
  React.useEffect(() => {
  if(selectedKey === "0" ) {
    setCurConfig({nextCustomText: "", showNext: true, showPrev: false});
  }
  if(selectedKey === "1" ) {
    setCurConfig({...curConfig, showNext: false, showPrev: true});
  }
  if( selectedKey === "2" || selectedKey === "3" ) {
    setCurConfig({nextCustomText: "", showNext: true, showPrev: true});
  }
  if(selectedKey === "4") {
    setCurConfig({nextCustomText: "Confirm & create Partner", showNext: true, showPrev: true});
  }
  }, [selectedKey]);

  function _customRenderer(
    link?: IPivotItemProps,
    defaultRenderer?: (link?: IPivotItemProps) => JSX.Element | null,
  ): JSX.Element | null {
    if (!link || !defaultRenderer) {
      return null;
    }
    // console.dir(link);
    const activeTab = (link.itemKey == selectedKey);

    return (
      <div className="hdi_tab"> 
        <Icon className="hdi_icon" iconName={link.itemIcon} style={activeTab? { color: hdi_green }: { color: hdi_grey }} />
        <span style={{ flex: '0 1 100%' }}>
          {defaultRenderer({ ...link, itemIcon: undefined })}
         </span>
      </div>
    );
  }

  function onNextStep() {
    if(selectedKey === "4") {
      alert("Partner created");
      return;
    }
    props.onNextStep();
  } 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleCompanySearchResults(resultContent: any): void {
    if(resultContent.length === 0) {
      console.log("Search Databases button clicked");
      setCurConfig({ showNext: true,  nextCustomText: "Create partner manually", showPrev: true});
    }
    // console.log(resultContent);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFormData = (newField: Record<string, any>): void => {
      formDataRef.current = { ...formDataRef.current, ...newField };
  };

 
  return (
    <>
    <div >
      <Pivot aria-label="Links of Tab Style Pivot Example" linkFormat="tabs" selectedKey={selectedKey}>
        <PivotItem headerText="Partner Type" style={tmpStyle} itemIcon="Location"
          onRenderItemLink={_customRenderer}>
        <PartnerTypeStep updateFormData={updateFormData} formData={formDataRef.current} />
        </PivotItem> 
        <PivotItem headerText="Search Company" style={tmpStyle} itemIcon="Completed" onRenderItemLink={_customRenderer}>
          <SearchCompanyStep onCompanySearchResults={handleCompanySearchResults}  onNextStep={props.onNextStep}/>
        </PivotItem>
        <PivotItem headerText="Name / Address"  style={tmpStyle} itemIcon="LocationCircle" onRenderItemLink={_customRenderer}>
          <NameAdressStep context={props.context} updateFormData={updateFormData} formData={formDataRef.current} />
        </PivotItem>
        <PivotItem headerText="Telecommunication"  style={tmpStyle} itemIcon="LocationCircle" onRenderItemLink={_customRenderer}>
          <TelecommunicationStep context={props.context} updateFormData={updateFormData} formData={formDataRef.current} />
        </PivotItem>
        <PivotItem headerText="Review" itemIcon="LocationCircle" style={tmpStyle}  onRenderItemLink={_customRenderer}>
          <ReviewStep context={props.context} formData={formDataRef.current} goToStep={props.onhandleStep} />
        </PivotItem>
      </Pivot>
    </div>
    <Footer onNextStep={onNextStep} onPrevStep={props.onPrevStep} config={curConfig}/>
  </>
  );
};

export default TabControl;
