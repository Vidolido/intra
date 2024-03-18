import { TemplatesContextProvider } from '../_state/templates/templatesContext';

const TemplateLayout = ({ children }) => {
	return <TemplatesContextProvider>{children}</TemplatesContextProvider>;
};

export default TemplateLayout;
