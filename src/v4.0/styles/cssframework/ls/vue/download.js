import Vue from 'vue';
function Download(url, param, filename){

  let status = false;
  let r = new DownloadEx(status);
  let method = param.method;
  if(!method){
     method = "get"
  }
  if(typeof method != 'string'){
     method = "get"
  }
  let axiosThen =  response => {
      let content = response.data;
      const blob = new Blob([content]);
      if (window.navigator.msSaveOrOpenBlob) {
          // 兼容IE10
          navigator.msSaveBlob(blob, filename)
      }
      else {
          // chrome/firefox
          let aTag = document.createElement('a');
          aTag.setAttribute('download', filename);
          aTag.style.display = 'none';
          aTag.href = URL.createObjectURL(blob);
          document.body.appendChild(aTag);
          aTag.click();
          URL.revokeObjectURL(aTag.href);
      }
      if(r.thenfunc){
          r.thenfunc();
      }
  }
  let axiosCatch = error => {
      console.log(error);
      status = false;
      if(r.catchfunc){
          r.catchfunc();
      }
  }
  if(method === 'get'){
      Vue.axios.get(url, {responseType: 'blob'})
          .then(axiosThen)
          .catch(axiosCatch)
  }else{
      Vue.axios[method](url, param, {responseType: 'blob'})
          .then(axiosThen)
          .catch(axiosCatch)
  }
  return r;
}

class DownloadEx {

    constructor(status){
        this.status = status;
    }

    then(func){
        this.thenfunc = func;
        return this;
    }

    catch(func){
        this.catchfunc = func;
        return this;
    }
}

export const download = Download;
