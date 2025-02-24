import { Children, Gap } from "@/interface/IGlobal";

export interface PropsFlexWrap extends Children, Gap {}

export const FlexWrap = ({ children, gap }: PropsFlexWrap) => {
  return <div className={`flex flex-wrap ${gap}`}>{children}</div>;
};
