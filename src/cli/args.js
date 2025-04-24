const parseArgs = () => {
  const argv=process.argv.slice(2)
  const formatData=[];
  for(let i=0; i<argv.length-1;i+=2){
    const promtData=argv[i].replace(/^--/,"");
    const promtValue=argv[i+1];
    formatData.push(`${promtData} is ${promtValue}`)
  }
  console.log(formatData.join(", "));
};

parseArgs();
