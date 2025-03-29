import {} from "@identity/colors";
import {Skygreen} from "@identity/palettes/main";
import scrollbar from "@identity/scrollsbar";

import { packLoadPalette, load_scrollbar, init, getTheme } from "@jeff-aporta/theme-manager";

const skygreen = new Skygreen(packLoadPalette);
packLoadPalette.color_register["main"] = skygreen;

load_scrollbar(scrollbar);

init()

console.log(getTheme())

export default {status:"runned"};
