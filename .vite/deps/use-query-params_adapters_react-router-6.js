import {
  DataRouterContext,
  NavigationContext,
  useLocation,
  useNavigate
} from "./chunk-TEZR7KK3.js";
import "./chunk-IIT576ZH.js";
import {
  require_react
} from "./chunk-3VDXVL42.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/use-query-params/adapters/react-router-6/index.js
var import_react = __toESM(require_react());
var ReactRouter6Adapter = ({
  children
}) => {
  var _a;
  const { navigator } = (0, import_react.useContext)(NavigationContext);
  const navigate = useNavigate();
  const router = (_a = (0, import_react.useContext)(DataRouterContext)) == null ? void 0 : _a.router;
  const location = useLocation();
  const adapter = {
    replace(location2) {
      navigate(location2.search || "?", {
        replace: true,
        state: location2.state
      });
    },
    push(location2) {
      navigate(location2.search || "?", {
        replace: false,
        state: location2.state
      });
    },
    get location() {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = router == null ? void 0 : router.state) == null ? void 0 : _a2.location) != null ? _b : navigator == null ? void 0 : navigator.location) != null ? _c : location;
    }
  };
  return children(adapter);
};
export {
  ReactRouter6Adapter
};
//# sourceMappingURL=use-query-params_adapters_react-router-6.js.map
