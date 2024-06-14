// Secondary
#F76434 #4AA088 #FAAD00 #53C2C2
#CFFAFA
// Primary
// #5ACCCC, #FFFFFF, #335C6E , #FABD33.

    <div className="search-container flex sm:flex sm:space-x-2">
    		<div className="search-input flex-1 mb-2 sm:mb-4 sm:mr-2">
    			<Autocomplete
    				freeSolo
    				options={data?.books || []}
    				onInputChange={(event, newInputValue) => {
    					setInputValue(newInputValue);
    				}}
    				renderInput={(params) => (
    					<TextField {...params} label="Search Books" variant="outlined" />
    				)}
    				getOptionLabel={(option) => `${option.title} by ${option.author}`}
    				onSelectionChange={(event, newValue) => {
    					setSelectedBook(newValue);
    				}}
    			/>
    		</div>
    		<div className="search-button">
    			<Button onClick={handleSearch}>Search</Button>
    		</div>
    	</div>
