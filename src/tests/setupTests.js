import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Dotenv from "dotenv";

Dotenv.config({ path: ".env.test" });

Enzyme.configure({ adapter: new Adapter() });
