export default({
     app,
     store,
})=>{
     app.router.beforeEach((to,from,next)=>{
         let  uuid = localStorage.getItem('uuid');
         let  other = sessionStorage.getItem('other');
          if (to.query.uuid) {
               next();
               return;
              };

          if (to.query.other) {
               next();
               return;
          };
          if(uuid && uuid!=="undefined" && uuid!=="null"){
                let query ={
                     uuid:uuid,
                     ...to.query
                }
                next({
                    path: to.path,
                    query:query
                    });
          }else{
               next();
          }

          if(other && other!=="undefined" && other!=="null"){
               let query ={
                    uuid:uuid,
                    other:other,
                    ...to.query
               }
               next({
                   path: to.path,
                   query:query
                   });
         }else{
              next();
         }
          next();
     })
}