import { PaperP } from "@containers";
import { href } from "@jeff-aporta/theme-manager";

export default Footer;

function Footer({ updateThemeName, getThemeName }) {
  return (
    <PaperP elevation={0} className="content-container d-end min-h-200px footer">
      <div className="d-end-wrap gap-10px">
        <span>Cuidando la salud con tecnología avanzada.</span>
        <strong className="c-deepskyblue">
          &copy; {new Date().getFullYear()} DrTrack
        </strong>
      </div>
    </PaperP>
  );
}
