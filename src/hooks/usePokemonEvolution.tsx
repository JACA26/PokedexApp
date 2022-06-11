import { useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { Species } from "../interfaces/pokemonInterfaces";


export const usePokemonEvolution = (specie: Species ) => {
    const [isLoading, setIsLoading] = useState(true);
    const {url} = specie;
    const [evoChain, setEvoChain] = useState([]);
    
    const loadEvolutions = async () => {
        const response = await pokemonApi.get(url);
        const {evolution_chain} = response.data;
        const {url: urlEvolution} = evolution_chain;
        const evolutionChain = await pokemonApi.get(urlEvolution);
        const {chain} = evolutionChain.data;
        let evoData = chain;
        
        do {
        var evoDetails = evoData['evolution_details'][0];
        
        /* evoChain.push({
            species_name: evoData.species.name,
            min_level: !evoDetails ? 1 : evoDetails.min_level,
            trigger_name: !evoDetails ? null : evoDetails.trigger.name,
            item: !evoDetails ? null : evoDetails.item
        }); */
        
        evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    }
    
    
}