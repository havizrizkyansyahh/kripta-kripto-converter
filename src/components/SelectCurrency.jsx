import PropTypes from "prop-types"
import { useState, useEffect } from "react";

const fiatCurrencies = [
    { name: "US Dollar", ticker: "USD", code: "en-US", perUsd: 1, symbol: "$" },
    { name: "Rupiah", ticker: "IDR", code: "id-ID", perUsd: 15000, symbol: "Rp" }
]

const SelectCurrency = ({ onSelectedFiat }) => {
    const [fiatPerUsd, setFiatPerUsd] = useState(); 

    const handleChange = (e) => {
        const selectedName = e.target.value;
        const selectedCurrency = fiatCurrencies.find(
            (fiatCurrency) => fiatCurrency.name === selectedName
        );

        if(selectedCurrency.code === "id-ID") selectedCurrency.perUsd = fiatPerUsd;

        onSelectedFiat(selectedCurrency);
    };

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

    return(
        <div className="flex flex-col my-2">
            <label htmlFor="selectCurrency" className="text-sm mb-1 font-semibold">Select Currency</label>
            <select name="selectCurrency" id="selectCurrency" 
                className="w-full md:w-64 border-solid border-2 rounded-lg p-3"
                onChange={handleChange}
            >
                { fiatCurrencies.map((fiatCurrency) => (
                    <option value={fiatCurrency.name} key={fiatCurrency.name}>
                        {`${fiatCurrency.name} (${fiatCurrency.ticker})`}
                    </option>
                )) }
            </select>
        </div>
    )
}

SelectCurrency.propTypes = {
    selectedFiat: PropTypes.object,
    onSelectedFiat: PropTypes.func
}

export default SelectCurrency