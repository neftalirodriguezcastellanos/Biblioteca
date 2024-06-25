import { ConfigurationProvider } from "./ConfigurationContext";
import { LayoutProvider } from "./LayoutContext";
import { SessionProvider } from "./SessionContext";
import { RequestProvider } from "./RequestContext";

export const AllSystemProvider = (props) => (
  <ConfigurationProvider>
    <LayoutProvider>
      <SessionProvider>
        <RequestProvider>{props.children}</RequestProvider>
      </SessionProvider>
    </LayoutProvider>
  </ConfigurationProvider>
);
