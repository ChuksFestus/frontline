import React from 'react'
import RegLayout from '../RegLayout'

const registrationStagesPaths = [
  '/old',
  '/old2',
]

const registrationStagesDesc = [
  'Details',
  'Others',
]

const GuestRoute = ({ component: Component, path }) => (
  <React.Fragment>
    <RegLayout>
      <div>
        <h1
          style={{
            color: '#656768',
            fontSize: '3rem',
            fontWeight: '900',
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: '30px',
          }}
          className="encode-font"
        >
          onboarding
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '5rem',
        }}
      >
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: '2px',
              backgroundColor: '#ddd',
            }}
          />
          <ul
            style={{
              position: 'relative',
              width: 'auto',
              listStyleType: 'none',
              display: 'flex',
            }}
          >
            {Array(2)
              .fill('')
              .map((v, i) => (
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      backgroundColor:
                        path === registrationStagesPaths[i]
                          ? '#D5C67A'
                          : '#efdf8d',
                      // backgroundColor: 'rgba(213, 198, 122, 0.5)',
                      color: '#fff',
                      // border: '10px solid #EDEEE9',
                      // marginLeft: i === 0 ? '0px' : '4rem',
                      margin: '0px 2rem',
                      // opacity: path === registrationStagesPaths[i] ? 1 : 0.5,
                    }}
                  >
                    {' '}
                    {i + 1}{' '}
                  </div>{' '}
                  <span>{registrationStagesDesc[i]}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Component />
    </RegLayout>
  </React.Fragment>
)

export default GuestRoute
