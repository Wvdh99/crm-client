import * as React from 'react';
import {
  withRouter, Switch, Route, NavLink,
} from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';
import ProductsPage from './pages/ProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import ProductCreatePage from './pages/ProductCreatePage';
import CompaniesPage from './pages/CompaniesPage';
import SingleCompanyPage from './pages/SingleCompanyPage';
import CompaniesCreatePage from './pages/CompaniesCreatePage';
import AlertContainer from './components/alerts/AlertContainer';
import ContactsPage from './pages/ContactPage';
import InvoicesPage from './pages/InvoicesPage';
import SingleInvoicePage from './pages/SingleInvoicePage';
/* import SingleProductPage from './pages/SingleProductPage'; */
import ContractsPage from './pages/ContractsPage';
import SingleContractPage from './pages/SingleContractPage';
import ContractsCreatePage from './pages/ContractCreatePage';

function Routes() {
  return (
    <div>
      {/* TODO: Refactor menu */}
      <Menu fixed="top" inverted size="large">
        <Container>
          <Menu.Item as={NavLink} header to="/" exact>
            CRM
          </Menu.Item>
          <Menu.Item as={NavLink} to="/product">
            <Icon name="shopping bag" />
            Products
          </Menu.Item>
          <Menu.Item as={NavLink} to="/company">
            <Icon name="building" />
            Companies
          </Menu.Item>
          <Menu.Item as={NavLink} to="/contract">
            <Icon name="file alternate" />
            Contracts
          </Menu.Item>
          <Menu.Item as={NavLink} to="/contact">
            <Icon name="address book" />
            Contacts
          </Menu.Item>
          <Menu.Item as={NavLink} to="/invoice">
            <Icon name="file alternate" />
            Invoices
          </Menu.Item>
        </Container>
      </Menu>
      <Container
        className="main"
        fluid
      >
        <AlertContainer internal />
        <Switch>
          {/* Product */}
          <Route path="/product" exact>
            <ProductsPage />
          </Route>
          <Route path="/product/new" exact>
            <ProductsPage />
            <ProductCreatePage />
          </Route>
          <Route path="/product/:productId" exact component={SingleProductPage} />
          {/* Company */}
          <Route path="/company" exact>
            <CompaniesPage />
          </Route>
          <Route path="/company/new" exact>
            <CompaniesPage />
            <CompaniesCreatePage />
          </Route>
          <Route path="/company/:companyId" exact component={SingleCompanyPage} />

          {/* Contacts */ }
          <Route path="/contact" exact>
            <ContactsPage />
          </Route>

          {/* Invoice */}
          <Route path="/invoice" exact>
            <InvoicesPage />
          </Route>

          <Route path="/company/:invoiceId" exact component={SingleInvoicePage} />
          {/* Contracts */}
          <Route path="/contract" exact>
            <ContractsPage />
          </Route>
          <Route path="/contract/new" exact>
            <ContractsPage />
            <ContractsCreatePage />
          </Route>
          <Route path="/contract/:contractId" exact component={SingleContractPage} />
        </Switch>
      </Container>

    </div>
  );
}
const routesWithRouter = withRouter(Routes);
export { routesWithRouter as Routes };
