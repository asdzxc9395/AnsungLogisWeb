import { read, utils, writeFile } from 'xlsx';


export const useExcel = () => {
    const exportExcel = (headers, items, name) => {
        if (items.length < 1) {
          return
        }
        const datas = []
        console.log(items)
        items.forEach(item => {
          let except = []
      
          let row = Object.fromEntries(
            Object.entries(item).map(([key, value]) => {
              let header = headers.find(obj => obj.value === key)
              let setKey = header != undefined ? header.label : key
      
              if (setKey == key) {
                except.push(setKey)
              }
              return [setKey, value]
            })
          )
          if (except.length > 0) {
            except.forEach(key => {
              // delete row[key]
            })
          }
          datas.push(row)
        })
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(datas)
        utils.book_append_sheet(wb, ws, 'Sheet')
        // ws["!merges"] = merge;  
        // const merge = [
        //   { s: { r: 11, c: 0 }, e: { r: 12, c: 0 } },{ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
        // ];
        const filename = name + '_EXPORT_' + new Date().toISOString().substr(0, 10) + '.xlsx'
        writeFile(wb, filename)
      }
    return {
        exportExcel
    }
}

// pickFile() {
//     this.items = []
//     this.$refs.excel.click()
//   },
//   onFilePicked(e) {
//     var file = e.target.files ? e.target.files[0] : null;
//     // let workbook= readFile(file);
//     if(file) {
//       const reader= new FileReader();
//       reader.onload= (e)=> {
//         /* Parse data */
//         const bstr= e.target.result;
//         const wb= read(bstr, { type: 'binary' });
//         /* Get first worksheet */
//         const wsname= wb.SheetNames[0];
//         const ws= wb.Sheets[wsname];
//         /* Convert array of arrays */
//         const data= utils.sheet_to_json(ws, { header: 1 });
//         data.shift()
//         console.log(data)
//         let header = []
//         this.headers.forEach(e => {
//           header.push(e.value)
//         })
        
//         let keys = Object.assign({}, header)
//         data.forEach(function(e, i) {
//           e = Object.assign({}, e)
//           for(let j = 0; j < Object.values(keys).length; j++) {
//             e[keys[j]] = e[j]
//             delete e[j]
//           }
//           data[i] = e
//         })
//         // 화면적용
//         let arr = []
//         for(let i = 0; i < data.length; i++) {
//           if(data[i].drawHno) {
//             arr.push(data[i])
//           }
//         }
//         this.items = arr
//       }
//       reader.readAsBinaryString(file)
//     }
//   },
