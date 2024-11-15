import PropTypes from "prop-types"

const Select = ({ label, options, valueKey, selectedValue, labelFormatter, onChange }) => {
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const selectedOption = options.find((option) => 
            option[valueKey] === selectedValue
        );

        onChange(selectedOption);
    };

    return(
        <div className="flex flex-col  my-2 md:mx-2">
            <label htmlFor="select" className="text-sm mb-1 font-semibold">{label}</label>
            <select name="select" id="select" 
                className="w-full md:w-64 lg:text-xs xl:text-base lg:w-36 xl:w-52 border-solid border-2 rounded-lg p-3"
                onChange={handleChange}
                value={ selectedValue ? selectedValue[valueKey] : "" }
            >
                { options.map((option) => (
                    <option value={option[valueKey]} key={option[valueKey]}>
                        { labelFormatter(option) }
                    </option>
                ))}
            </select>
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    valueKey: PropTypes.string,
    selectedValue: PropTypes.object,
    labelFormatter: PropTypes.func,
    onChange: PropTypes.func
}

export default Select