const url = new URL(window.location.href)
const onload = function(){
    const images = document.body.querySelectorAll("img")
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
        const image = Array.from(images).find((image) => image.clientWidth >= 160);
            if (image) {
                 let mobile_image_request = fetch('https://ssp.afp.ai/api/sdk_statistic/event_mobile_image_found?publisher_page_url='+window.location.href,{
                 method: 'POST'
                 });
                      }}
             else {
                     const image = Array.from(images).find((image) => image.clientWidth >= 300);
                        if (image) {
                             let desktop_image_request = fetch('https://ssp.afp.ai/api/sdk_statistic/event_desktop_image_found?publisher_page_url='+window.location.href,{
                             method: 'POST'
                                           }); 
                           };
                   };
          };
if (url.pathname != '/') {
     let load_request = fetch('https://ssp.afp.ai/api/sdk_statistic/event_sdk_load?publisher_page_url='+window.location.href,{
         method: 'POST'
         });
        if (document.readyState === 'complete') {
            onload();
          } else {
            window.addEventListener('load', onload);

          }
};