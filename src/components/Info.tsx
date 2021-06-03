import React, {FC, useState} from 'react';
import './misestilos.css';
import charizard from './charizard.png'
import pokeball from './pokeball.png'
import { transform } from 'typescript';

interface IPokemon {
    name: string;
    url: string;
}

interface IResult {
    count: number;
    next: string;
    previous: string;
    results: IPokemon[];
}

interface IPokemonData {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: IAbility[];
    held_items: IItem[];
    moves: IMove[];
    sprites: {
        front_default: string;
        front_shiny: string;
    }
}

interface IAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
}

interface IAbilityData {
    name: string;
    effect_entries: {
        effect: string;
        language: {
            name: string;
            url: string;
        };
        short_efect: string;
    }[];
    pokemon: {
        pokemon: {
            name: string;
            url: string;
        }
    }[];
}

interface IItem {
    item: {
        name: string;
        url: string;
    };
}

interface IItemData {
    effect_entries: {
        effect: string;
        language: {
            name: string;
        }
    }[];
    sprites: {
        default: string;
    };
    name: string;
    held_by_pokemon: {
        pokemon: IPokemon;
    }[];
}

interface IMove {
    move: {
        name: string;
        url: string;
    };
    version_group_details: {
        level_learned_at: string;
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        }
    }[];
}

interface IMoveData {
    name: string;
    accuracy: number;
    power: number;
    pp: number;
    damage_class: {
        name: string;
    };
    effect_entries: {
        effect: string;
        language: {
            name: string;
        }
    }[];
    learned_by_pokemon: IPokemon[];
    target: {
        name: string;
    }
    type: {
        name: string;
    }
}



const Info: FC = () => {

    const [menu, setMenu] = useState<boolean>(true)
    const [text, setText] = useState<string>("");
    const [pokemonList,  setPokemonList]  = useState<IPokemon[]>([]);
    const [filteredList, setFilteredList] = useState<IPokemon[]>([]); 
    const [pokemonData,  setPokemonData]  = useState<IPokemonData>();
    const [abilityData,  setAbilityData]  = useState<IAbilityData>();
    const [moveData, setMoveData] = useState<IMoveData>();
    const [itemData, setItemData] = useState<IItemData>();
    
    const search = async (url: string) => {
        const info: IPokemon[] = await searchIteration(url)
        setPokemonList(info);
    }

    const searchIteration = async (url: string): Promise<IPokemon[]> => {
        
        let data: IResult = await ( await fetch(url) ).json()
        let info: IPokemon[] = data.results
       
        if(data.next) 
            info = info.concat( await searchIteration(data.next) )

        return info
    }

    const filterPokemon = (nombre: string) => {
        const filtered: IPokemon[] = pokemonList.filter((p: IPokemon) =>  {
            return p.name.includes(nombre);
        });

        setFilteredList(filtered.slice(0, 10));
    }

    const searchPokemonData = async (url: string) => {
        const data: IPokemonData = await ( await fetch(url) ).json()
        setPokemonData(data);
    }

    const searchAbilityData = async (url: string) => {
        const data: IAbilityData = await ( await fetch(url) ).json()
        setAbilityData(data)
    }

    const searchMoveData = async (url: string) => {
        const data: IMoveData = await ( await fetch(url) ).json()
        setMoveData(data)
    }

    const searchItemData = async (url: string) => {
        const data: IItemData = await ( await fetch(url) ).json()
        setItemData(data)
    }

    const getAbilityEffect = (): string => {
        let effect: string = "Effect not found"
        abilityData?.effect_entries.forEach((elem) => {
            if(elem.language.name === "en")
                effect = elem.effect
        })
        return effect
    }

    const getMoveEffect = (): string => {
        let effect: string = "Effect not found"
        moveData?.effect_entries.forEach((elem) => {
            if(elem.language.name === "en")
                effect = elem.effect
        })
        return effect
    }

    const getItemEffect = (): string => {
        let effect: string = "Effect not found"
        itemData?.effect_entries.forEach((elem) => {
            if(elem.language.name === "en")
                effect = elem.effect
        })
        return effect
    }

    return(
        <div>
            <div className="barra">
                {!menu && <input 
                    className="inputText"
                    type="text" 
                    placeholder="Buscador"
                    value={text} 
                    onChange={
                        async (e) => {                    
                            setText(e.target.value);
                            filterPokemon(e.target.value);
                        }
                    }
                />}

                {!menu && <button className="menuReturnButton" onClick={(e) => {
                    setMenu(true)
                    setAbilityData(undefined)
                    setPokemonData(undefined)
                    setMoveData(undefined)
                    setItemData(undefined)
                }
                }>menu</button>}

                {text && !menu && filteredList.map((p: IPokemon) => 
                    <div 
                        className="pokemonList"
                        onClick={
                            async () => {
                                setText(""); 
                                await searchPokemonData(p.url); 
                            }
                        }
                    >{p.name}</div>
                )}
            </div>


            {menu &&
                <div className="menu">
                    <div className="miBoton">
                        <img 
                            className="miImagenMenu"
                            src={charizard}
                            onClick={
                                async () => {
                                    await search('https://pokeapi.co/api/v2/pokemon/');
                                    await searchPokemonData("https://pokeapi.co/api/v2/pokemon/6")
                                    setMenu(false)
                                }
                            }
                        />
                        <strong>Pokemon search</strong>
                    </div>
                    <div className="miBoton">
                        <img 
                            className="miImagenMenu"
                            src={pokeball}
                            onClick={
                                async () => {
                                    await search('https://pokeapi.co/api/v2/pokemon/');
                                    await searchPokemonData("https://pokeapi.co/api/v2/pokemon/" + Math.round(800 * Math.random() + 1))
                                    setMenu(false)
                                }
                            }
                        />
                        <strong>Pokemon random</strong>
                    </div>
                </div>
            }
            
            {pokemonData && 
                <div className="displayData">
                    <div className="fila">
                        <img className="imagenPokemon" src={pokemonData?.sprites.front_default}></img>                            

                        <div className="listaDatos">
                            <div><strong>Nombre: </strong>{pokemonData?.name}</div>
                            <div><strong>Número de la pokedex: </strong>{pokemonData?.id}</div>
                            <div><strong>Altura: </strong>{pokemonData?.height/10 + " m"}</div>
                            <div><strong>Peso: </strong>{pokemonData?.weight/10 + " kg"}</div>

                            {pokemonData?.abilities && 
                                <div>
                                    <strong>Habilidades</strong>
                                    {pokemonData?.abilities.map((elem: IAbility) => 
                                        <div 
                                            className="clickeable"
                                            onClick={() => {
                                                searchAbilityData(elem.ability.url)
                                                setPokemonData(undefined)
                                            }}
                                        >{" - " + elem.ability.name}</div>
                                    )}
                                </div>
                            }

                            {pokemonData?.held_items && 
                                <div>
                                    <strong>Items</strong>
                                    {pokemonData?.held_items.map((elem: IItem) => 
                                        <div
                                            className="clickeable"
                                            onClick={() => {
                                                searchItemData(elem.item.url)
                                                setPokemonData(undefined)
                                            }}
                                        >{" - " + elem.item.name}</div>
                                    )}
                                    {pokemonData?.held_items.length == 0 && <div>None</div>}
                                </div>
                            }
                        </div>
                    </div>
                    
                    <button
                        className="shinyButton"
                        onClick={() => {
                            const pokeData: IPokemonData = {
                                ...pokemonData,
                                sprites: {
                                    front_default: pokemonData.sprites.front_shiny,
                                    front_shiny: pokemonData.sprites.front_default
                                },
                            }
                            setPokemonData(pokeData)
                        }}
                    >Shiny</button>

                    <div>
                        <strong>Movimientos</strong>
                        {pokemonData?.moves.map((elem: IMove) => 
                            <div
                                className="clickeable"
                                onClick={() => {
                                    searchMoveData(elem.move.url)
                                    setPokemonData(undefined)
                                }}
                            >{" - " + elem.move.name}</div>
                        )}
                    </div>                    
                </div>   
            }

            {abilityData && 
                <div className="displayData">
                    <div><strong>Name: </strong>{abilityData.name}</div>
                    <div><strong>Effect: </strong>{getAbilityEffect()}</div>
                    <div>
                        <strong>Pokemon that know this ability</strong>
                        {abilityData.pokemon.map((e) => 
                            <div 
                                className="clickeable"
                                onClick={() => {
                                    setAbilityData(undefined)
                                    searchPokemonData(e.pokemon.url)
                                }} 
                            >{" - " + e.pokemon.name}</div>
                        )}
                    </div>
                </div>
            }

            {moveData &&
                <div className="displayData">
                    <div><strong>Name: </strong>{moveData.name}</div>
                    <div><strong>Power: </strong>{moveData.power || " - "}</div>
                    <div><strong>Accuracy: </strong>{moveData.accuracy || " - "}</div>
                    <div><strong>PP: </strong>{moveData.pp}</div>
                    <div><strong>Effect: </strong>{getMoveEffect()}</div>
                    <div><strong>Type: </strong>{moveData.type.name}</div>
                    <div><strong>Category: </strong>{moveData.damage_class.name}</div>
                    <div><strong>Target: </strong>{moveData.target.name}</div>
                    <div>
                        <strong>Pokemon that know this move</strong>
                        {moveData.learned_by_pokemon.map((e) => 
                            <div 
                                className="clickeable"
                                onClick={() => {
                                    setMoveData(undefined)
                                    searchPokemonData(e.url)
                                }} 
                            >{" - " + e.name}</div>
                        )}
                    </div>
                </div>
            }

            {itemData && 
                <div className="displayData">
                    <img className="imagenObjeto" src={itemData.sprites.default}/>
                    <div><strong>Name: </strong>{itemData.name}</div>
                    <div><strong>Effect: </strong>{getItemEffect()}</div>
                    <div>
                        <strong>Pokemon that held this item</strong>
                        {itemData.held_by_pokemon.map((e) => 
                            <div 
                                className="clickeable"
                                onClick={() => {
                                    setItemData(undefined)
                                    searchPokemonData(e.pokemon.url)
                                }} 
                            >{" - " + e.pokemon.name}</div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default Info;