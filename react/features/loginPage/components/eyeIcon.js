import React, { Component, Fragment } from 'react'

export default class EyeIcon extends Component{
    constructor(props){
        super(props);
    }
    togglPasswordIcon = e =>{
        e.preventDefault();
        this.props.dispatchFunction(event)
    }
    render(){
        return(
            <Fragment>
                 <i name={ this.props.name || null } onClick={ this.togglPasswordIcon }>
                      { this.props.showPassword ?
                        <svg
                        width='15.619'
                        height='18.515'
                        viewBox='0 0 15.619 18.515'
                      >
                        <g transform='translate(-1254.117 -380.966)'>
                          <g
                            style={ { fill: '#444' } }
                            className='a'
                            transform='translate(6.038 4.056)'
                          >
                            <g transform='translate(1248.078 382.557)'>
                              <path
                                style={ { fill: '#444' } }
                                className='b'
                                d='M15.52,97.509c-.14-.191-3.464-4.674-7.71-4.674S.238,97.318.1,97.509a.515.515,0,0,0,0,.608c.139.191,3.464,4.674,7.71,4.674s7.571-4.483,7.71-4.674a.515.515,0,0,0,0-.608ZM7.81,101.76c-3.128,0-5.837-2.975-6.639-3.948.8-.974,3.5-3.947,6.639-3.947s5.836,2.975,6.639,3.948C13.647,98.786,10.944,101.76,7.81,101.76Z'
                                transform='translate(0 -92.835)'
                              />
                              <g transform='translate(4.72 1.888)'>
                                <path
                                  className='b'
                                  d='M157.811,154.725a3.09,3.09,0,1,0,3.09,3.09A3.09,3.09,0,0,0,157.811,154.725Zm0,5.149a2.06,2.06,0,1,1,2.06-2.06,2.06,2.06,0,0,1-2.06,2.06Z'
                                  transform='translate(-154.722 -154.725)'
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>  :
                      <svg
                        className='close'
                        width='15.619'
                        height='18.515'
                        viewBox='0 0 15.619 18.515'
                      >
                        <g transform='translate(-1254.117 -380.966)'>
                          <g
                            style={ { fill: '#444' } }
                            className='a'
                            transform='translate(6.038 4.056)'
                          >
                            <g transform='translate(1248.078 382.557)'>
                              <path
                                style={ { fill: '#444' } }
                                className='b'
                                d='M15.52,97.509c-.14-.191-3.464-4.674-7.71-4.674S.238,97.318.1,97.509a.515.515,0,0,0,0,.608c.139.191,3.464,4.674,7.71,4.674s7.571-4.483,7.71-4.674a.515.515,0,0,0,0-.608ZM7.81,101.76c-3.128,0-5.837-2.975-6.639-3.948.8-.974,3.5-3.947,6.639-3.947s5.836,2.975,6.639,3.948C13.647,98.786,10.944,101.76,7.81,101.76Z'
                                transform='translate(0 -92.835)'
                              />
                              <g transform='translate(4.72 1.888)'>
                                <path
                                  className='b'
                                  d='M157.811,154.725a3.09,3.09,0,1,0,3.09,3.09A3.09,3.09,0,0,0,157.811,154.725Zm0,5.149a2.06,2.06,0,1,1,2.06-2.06,2.06,2.06,0,0,1-2.06,2.06Z'
                                  transform='translate(-154.722 -154.725)'
                                />
                              </g>
                            </g>
                            <line
                              className='c'
                              style={ { fill: 'none', strokelinecap: 'round' } }
                              y1='15.005'
                              x2='9.709'
                              transform='translate(1251.981 378.5)'
                            />
                            <line
                              className='d'
                              style={ {
                                fill: 'none',
                                strokelinecap: 'round',
                                stroke: '#444',
                                strokewidth: '1.5px'
                              } }
                              y1='15.005'
                              x2='9.709'
                              transform='translate(1251.981 379.383)'
                            />
                          </g>
                        </g>
                      </svg>
                      }
                    </i>
            </Fragment>
        )
    }
}