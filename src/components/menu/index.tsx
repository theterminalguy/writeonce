import { Navbar, Group, ScrollArea } from "@mantine/core";
import { FaFileInvoice } from "react-icons/fa";
import { MdOutlineDocumentScanner, MdSettings } from "react-icons/md";
import { TiFlowMerge } from "react-icons/ti";
import { GiPipes } from "react-icons/gi";
import LinksGroup, { LinksGroupProps } from "../atoms/links-group";
import "./index.css";
import AppName from "../atoms/app-name";
import AvatarIcon from "../atoms/avatar";
import avatar from "../../assets/unnamed.png";

const navLinks: LinksGroupProps[] = [
  {
    label: "My Documents",
    icon: MdOutlineDocumentScanner,
    // initiallyOpened: true,
    links: [
      { label: "My templates", link: "/" },
      { label: "New template", link: "/editor" },
    ],
  },
  {
    label: "Flows",
    icon: TiFlowMerge,
    links: [
      { label: "Marketplace", link: "/marketplace" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  {
    label: "Pipes",
    icon: GiPipes,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
  {
    label: "My Purchases",
    icon: FaFileInvoice,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
  {
    label: "Account Settings",
    icon: MdSettings,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

export default function Menu(): JSX.Element {
  // const templateId = generate()
  // const slug = `untitled-template-${templateId}`;
  // const navigation = useNavigate();

  // const handleNewTemplate = () => {
  //     store.dispatch(addTemplate({
  //         id: templateId,
  //         templateName: DefaultTemplateName,
  //         contentText: "",
  //         contentHTML: "",
  //     }));
  //     navigation(`/editor/${slug}`)
  // }
  
  const links = navLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const handleSignOut = () => {
    console.log("dispatch event...");
    window.dispatchEvent(new Event("sign-out"));
  };

  return (
    <>
      <Navbar p="md" className="vanilla__navbar__container">
        <Navbar.Section className="vanilla__navbar__header">
          <Group position="apart" className="vanilla__navbar__group">
            <AppName withLogo />
            <AvatarIcon image={avatar} />
          </Group>
        </Navbar.Section>

        <Navbar.Section
          grow
          className="vanilla__navbar__links__section__container"
          component={ScrollArea}
        >
          <div className="vanilla__navbar__links__section">{links}</div>
          <button onClick={handleSignOut} className={"signOut"}>
            {" "}
            Sign Out{" "}
          </button>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
