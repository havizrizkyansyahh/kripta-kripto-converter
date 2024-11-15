import { useEffect, useState } from "react"
import transferIcon from "./assets/transfer.png"
import EnterAmount from "./components/EnterAmount.jsx"
import Output from "./components/Output.jsx"
import Select from "./components/Select.jsx"

const fiatCurrencies = [
  { name: "US Dollar", ticker: "USD", code: "en-US", perUsd: 1, symbol: "$" },
  { name: "Rupiah", ticker: "IDR", code: "id-ID", perUsd: 15976, symbol: "Rp" }
]

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [updatedTime, setUpdatedTime] = useState();
  const [isSwitched, setIsSwitched] = useState(false);
  const [amount, setAmount] = useState("1");
  const [selectedCoin, setSelectedCoin] = useState({});
  const [selectedFiat, setSelectedFiat] = useState(fiatCurrencies[0]);
  const [fiatPerUsd, setFiatPerUsd] = useState();

  const handleAmount = (newAmount) => {
    setAmount(newAmount);
  }
  
  const handleFiatChange = (fiatCurrency) => {
    if(fiatCurrency.code === "id-ID") fiatCurrency.perUsd = fiatPerUsd;
    setSelectedFiat(fiatCurrency);
  };

  const handleIsSwitched = () => {
    setIsSwitched((isSwitched) => !isSwitched);
    setSelectedCoin(selectedCoin);
    setSelectedFiat(selectedFiat);
  }

  const selectOnLeft = !isSwitched 
    ? 
      <Select
        label="Select Coin"
        options={cryptoData}
        valueKey="id"
        selectedValue={selectedCoin}
        labelFormatter={(option) => `${option.name} (${option.symbol})`}
        onChange={setSelectedCoin}
      />
    : 
      <Select
        label="Select Currency"
        options={fiatCurrencies}
        valueKey="name"
        selectedValue={selectedFiat}
        labelFormatter={(option) => `${option.name} (${option.ticker})`}
        onChange={handleFiatChange}
      />

    const selectOnRight = !isSwitched 
      ? 
        <Select
          label="Select Currency"
          options={fiatCurrencies}
          valueKey="name"
          selectedValue={selectedFiat}
          labelFormatter={(option) => `${option.name} (${option.ticker})`}
          onChange={handleFiatChange}
        />
      : 
        <Select
          label="Select Coin"
          options={cryptoData}
          valueKey="id"
          selectedValue={selectedCoin}
          labelFormatter={(option) => `${option.name} (${option.symbol})`}
          onChange={setSelectedCoin}
        />

  useEffect(() => {
    const controller = new AbortController();

    const fetchCryptos = async () => {
      try{
        const res = await fetch(`https://api.coinlore.net/api/tickers/`, { signal: controller.signal });
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          setSelectedCoin(data.data.at(0));
          setCryptoData(data.data);
          setUpdatedTime(data.info.time);
        }

      } catch (error) {
        if(error.name !== "AbortError"){
          console.log(error.message);
        }
      }
    }

    fetchCryptos();

    return () => {
      controller.abort();
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPrice = async () => {
        try{
            const res = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_HIA3uclzk0PEzW5L4zmxHxjsarAye9JphloKEvmn&currencies=IDR`,
                { signal: controller.signal });

            const data = await res.json();
            setFiatPerUsd(data.data.IDR);
        }
        catch(error) {
            if(error.name !== "AbortError"){
                console.log(error.message);
            }
        }
    }

    fetchPrice();

    return () => {
        controller.abort();
    }
  }, []);

  return (
    <>
      <div className="container flex justify-center px-4 md:px-0">
        <div className="md:w-10/12 flex flex-col md:items-center">
          <h2 className='font-bold text-2xl '>Cryptocurrency Converter Calculator</h2>
          <p className="text-gray-500 md:w-full lg:text-center xl:w-3/4">
            Check the latest TOP 100 cryptocurrency prices against The US Dollar and Indonesian Rupiah currencies. <br/>
            KriptaKripto&apos;s cryptocurrency converter is simple to use and exchange rates are updated frequently.
          </p>
        </div>
      </div>
      
      <div className="container flex justify-center my-3">
        <div className="w-full md:w-10/12 flex justify-center border-solid border-2 rounded-lg p-3 bg-stone-100">
          <div className="w-full flex flex-col md:w-10/12 md:justify-center md:p-10">
            <div className="flex flex-col justify-between md:items-center md:text-center lg:flex-row ">
              <EnterAmount amount={amount} onAmount={handleAmount} />
              { selectOnLeft }
              <button className="flex items-center justify-center my-2 lg:mt-7"
                onClick={handleIsSwitched}
              >
                <img src={transferIcon} alt="transfer_icon" className="w-6 h-6" />
              </button>
              { selectOnRight }
            </div>
            <Output 
              amount={amount} 
              selectedCoin={selectedCoin} 
              selectedFiat={selectedFiat}
              updatedTime={updatedTime}
              isSwitched={isSwitched}
            />
          </div>
        </div>
      </div>

      <footer className="text-center">Created by &copy;Haviz Rizkyansyah</footer>
    </>
  )
}

export default App
