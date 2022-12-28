import "./index.css";

export default function Editor({ children }: { children: React.ReactNode }) {
  return (
    <div className="editor-container">
      <h1 contentEditable="true">New Template</h1>
      <div contentEditable="true" className="editor">
        Vestibulum vel orci hendrerit ligula pharetra volutpat et sed dui.
        Phasellus vitae feugiat dolor. Mauris eleifend neque ac iaculis aliquet.
        Nunc malesuada nisi in dictum tristique. Vestibulum mauris eros, varius
        sed faucibus sed, pellentesque et nunc. Curabitur ultricies blandit
        urna. Pellentesque ut augue mollis, lacinia dui non, rutrum justo. Nunc
        et odio dapibus, blandit leo eget, aliquet urna. Etiam lorem dolor,
        vehicula a purus in, fermentum congue diam. Integer vel urna nec turpis
        posuere tempor eu lacinia purus. Praesent mattis viverra lacus bibendum
        fringilla. Nulla commodo posuere ante, at cursus est rhoncus quis. In
        iaculis viverra neque in blandit. Pellentesque eleifend arcu diam, sed
        sodales ligula pharetra at. Morbi ac nisl adipiscing sem interdum
        convallis.
      </div>
      {children}
    </div>
  );
}
