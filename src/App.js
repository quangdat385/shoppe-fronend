import { Routes, Route } from 'react-router-dom';
import { DefaultLayout, AuthenticationLayout } from '~/layouts';
import { publicRouters, privateRouters, authRoutes } from '~/routes';

import PersitLogin from '~/features/auth/PersitLogin';
import RequireAuth from '~/features/auth/RequireAuth';
import config from '~/config';
import React from 'react';

import { useEffect } from 'react';




import Prefetch from '~/features/auth/Prefetch';
import { useNavigate, useLocation } from "react-router-dom";




function App() {


  const navigate = useNavigate();
  const { pathname } = useLocation();



  useEffect(() => {
    if (pathname === "/") {
      return navigate(`/home/0/sort?&byCollection=0`)

    }
  }, [pathname, navigate])












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
            <Layout status={route.status}>
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
          //dung Route moi dung duoc Outlet
          //Khong dung thi dung children

          <PersitLogin>


            <Prefetch>
              {route.allowedRoles === "user" ?
                <RequireAuth allowedRoles={[...Object.values(config.ROLES)]}>
                  <Layout>

                    <Page />
                  </Layout>
                </RequireAuth> : <RequireAuth allowedRoles={[config.ROLES.Manager, config.ROLES.Admin]}>
                  <Layout>

                    <Page />
                  </Layout>
                </RequireAuth>}
            </Prefetch>




          </PersitLogin>






        } />;
      })
      }


    </Routes>
  );
}

export default App;
