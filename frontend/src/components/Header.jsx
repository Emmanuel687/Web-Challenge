import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material";

const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<p className="text-[#5ACCCC] text-[35px] font-[800]">ello books 📚 </p>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
