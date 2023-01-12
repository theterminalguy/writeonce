import SidePanel from "../editors/vanilla/components/sidepanel";

const PlaceholderConfiguartion = () => {
    return (
        <div>
            Placeholder stuff
        </div>
    );
};

export default function QuickFlow() {
    return (
        <div className="wrapper">
            <div>
            Vestibulum vel orci hendrerit ligula pharetra volutpat et sed dui. Phasellus vitae feugiat dolor. Mauris eleifend neque ac iaculis aliquet. Nunc malesuada nisi in dictum tristique. Vestibulum mauris eros, varius sed faucibus sed, pellentesque et nunc. Curabitur ultricies blandit urna. Pellentesque ut augue mollis, lacinia dui non, rutrum justo. Nunc et odio dapibus, blandit leo eget, aliquet urna. Etiam lorem dolor, vehicula a purus in, fermentum congue diam. Integer vel urna nec turpis posuere tempor eu lacinia purus. Praesent mattis viverra lacus bibendum fringilla. Nulla commodo posuere ante, at cursus est rhoncus quis. In iaculis viverra neque in blandit. Pellentesque eleifend arcu diam, sed sodales ligula pharetra at. Morbi ac nisl adipiscing sem interdum convallis.            </div>
            <SidePanel component={<PlaceholderConfiguartion />} />
        </div>
    );
}

