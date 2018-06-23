import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { SearchBar } from "~modules/search";

storiesOf("SearchBar", module)
    .add("Initial", () => <SearchBar onChange={action("change")} />)
    .add("With Help Text", () => <SearchBar helpText="Enter query..." onChange={action("change")} />);
