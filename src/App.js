import { Routes, Route } from 'react-router-dom';
import { DefaultLayout, AuthenticationLayout } from '~/layouts';
import { publicRouters, privateRouters, authRoutes } from '~/routes';

import PersitLogin from '~/features/auth/PersitLogin';
import RequireAuth from '~/features/auth/RequireAuth';
import config from '~/config';
import React from 'react';

// import { useEffect } from 'react';


// import { store } from '~/app/store';
// import { usersApiSlice } from '~/features/users/usersApiSlice';

import Prefetch from '~/features/auth/Prefetch';





function App() {







  // useEffect(() => {
  //   // store.dispatch(productsApiSlice.util.prefetch('getProducs', 'productsList', { force: true }))
  //   // store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
  //   //   store.dispatch(cartApiSlice.util.prefetch('getCart', 'cartList', { force: true }))
  // }, [])


  return (
    <Routes>
      {/* public routes */}

      {publicRouters.map((route) => {
        let Layout = DefaultLayout;

        const Page = route.component;
        return <Route key={route.component} path={`${route.path}/*`} element={


          <Layout>
            <Page />
          </Layout>



        } />;

      })}
      {
        authRoutes.map((route) => {
          let Layout = AuthenticationLayout;

          const Page = route.component;

          return <Route key={route.component} path={`${route.path}/*`} element={
            <Layout>
              <Page />
            </Layout>
          } />;

        })
      }
      {/* private routes */}

      {privateRouters.map((route) => {
        let Layout = DefaultLayout;
        if (route?.layout) {
          Layout = route.layout;
        }
        const Page = route.component;
        return <Route key={route.component} path={`${route.path}/*`} element={


          <PersitLogin>
            <Layout>

              <Prefetch>
                {route.allowedRoles ?
                  <RequireAuth allowedRoles={[...Object.values(config.ROLES)]}>
                    <Page />
                  </RequireAuth> : <RequireAuth allowedRoles={[config.ROLES.Manager, config.ROLES.Admin]}>
                    <Page />
                  </RequireAuth>}
              </Prefetch>



            </Layout>
          </PersitLogin>






        } />;
      })
      }


    </Routes>
  );
}

export default App;
