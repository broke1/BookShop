export default {

  async getBooks() { 
    let data = {};
    let response = await fetch(`api/books`)
      .catch (error => {
        return error
      }) 
    if (response.status == 200) {  // если получилось
      await response.json().then( res => {  // переводим полученные данные из json в нормальный объект
        data = {status: "success",data: res}
      }).catch( error => {
        data= {status: "failed"}
      }) 
    }  
    return data
  },

  
  
 
};



