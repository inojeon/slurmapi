
export function squeueToJSON( text:string ) {
  const lines = text.split('\n')
  const result: object[] = []
  const headers = lines[0].split(" ").filter( data => data !=='')

  lines.slice(1).map(l => {
    const obj : any = {}
    const line = l.split(" ").filter( data => data !=='')

    if(line.length !== 0 ) {
      headers.map((h, i) => {
        if(h ==="NODELIST(REASON)") {
          obj.nodelist = line[i]
        } else {
          obj[h.toLowerCase()] = line[i]
        }
      })
      result.push(obj)
    }
  })
  return result
} 