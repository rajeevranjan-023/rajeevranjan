import { useMemo } from 'react'
import useDocumentTitle from '../../hooks/useDocumentTitle.js'

function SkillChip({ icon, name,link, brand = true }) {
  const iconKind = brand ? 'fa-brands' : 'fa-solid'
  return (
    <a href={link}>
      <div className="skill-chip">
        <i className={`${iconKind} ${icon}`}></i>
        <div class="skill-name">{name}</div>
        <div className="skill-tooltip">{name}</div>
      </div>
    </a>
  )
}
// ===============================================================================
export default function Skills() {
  useDocumentTitle('Skills')

  const languages = useMemo(
  () => [
    {
      icon: 'fa-c',
      name: 'C',
      link: 'https://en.cppreference.com/w/c',
    },
    {
      icon: 'fa-code',
      name: 'C++',
      brand: false,
      link: 'https://en.cppreference.com/w/',
    },
    {
      icon: 'fa-diagram-project',
      name: 'Data Structures & Algorithms',
      brand: false,
      link: 'https://www.geeksforgeeks.org/data-structures/',
    },
    {
      icon: 'fa-js',
      name: 'JavaScript',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
  ],
  [],
)

const fullStack = useMemo(
  () => [
    {
      icon: 'fa-html5',
      name: 'HTML5',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      icon: 'fa-css3-alt',
      name: 'CSS3',
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      icon: 'fa-node',
      name: 'Node.js',
      link: 'https://nodejs.org/docs/latest/api/',
    },
    {
      icon: 'fa-square-js',
      name: 'Express.js',
      link: 'https://expressjs.com/',
    },
    {
      icon: 'fa-database',
      name: 'MySQL',
      brand: false,
      link: 'https://dev.mysql.com/doc/',
    },
    {
      icon: 'fa-leaf',
      name: 'MongoDB',
      brand: false,
      link: 'https://www.mongodb.com/docs/',
    },
    {
      icon: 'fa-diagram-project',
      name: 'Mongoose',
      brand: false,
      link: 'https://mongoosejs.com/docs/',
    },
    {
      icon: 'fa-code',
      name: 'EJS',
      brand: false,
      link: 'https://ejs.co/',
    },
    {
      icon: 'fa-cloud-arrow-up',
      name: 'REST APIs',
      brand: false,
      link: 'https://restfulapi.net/',
    },
  ],
  [],
)

const tools = useMemo(
  () => [
    {
      icon: 'fa-code',
      name: 'VS Code',
      brand: false,
      link: 'https://code.visualstudio.com/docs',
    },
    {
      icon: 'fa-git-alt',
      name: 'Git',
      link: 'https://git-scm.com/doc',
    },
    {
      icon: 'fa-github',
      name: 'GitHub',
      link: 'https://github.com/',
    },
  ],
  [],
)

const electronics = useMemo(
  () => [
    {
      icon: 'fa-microchip',
      name: 'ESP32',
      brand: false,
      link: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/',
    },
    {
      icon: 'fa-microchip',
      name: 'Arduino',
      brand: false,
      link: 'https://docs.arduino.cc/',
    },
    {
      icon: 'fa-code',
      name: 'Embedded C',
      brand: false,
      link: 'https://en.cppreference.com/w/c',
    },
    {
      icon: 'fa-wifi',
      name: 'IoT',
      brand: false,
      link: 'https://en.wikipedia.org/wiki/Internet_of_things',
    },
    {
      icon: 'fa-wave-square',
      name: 'Sensors',
      brand: false,
      link: 'https://en.wikipedia.org/wiki/Sensor',
    },
    {
      icon: 'fa-memory',
      name: 'Microcontrollers',
      brand: false,
      link: 'https://en.wikipedia.org/wiki/Microcontroller',
    },
    {
      icon: 'fa-network-wired',
      name: 'UART / I²C / SPI',
      brand: false,
      link: 'https://learn.sparkfun.com/tutorials/serial-communication',
    },
  ],
  [],
)
// __________________________________________________________________
  return (
    <>
      <div className="eyebrow reveal">Capability Matrix</div>
      <h1 className="reveal">Skills &amp; Tech Stack</h1>
      

      <div className="skill-cat reveal">
        <h3>Programming Languages</h3>
        <div className="skill-grid">
          {languages.map((s) => (
            <SkillChip key={s.name} {...s} />
          ))}
        </div>
      </div>

      <div className="skill-cat reveal">
        <h3>Full-Stack Development</h3>
        <div className="skill-grid">
          {fullStack.map((s) => (
            <SkillChip key={s.name} {...s} />
          ))}
        </div>
      </div>

      <div className="skill-cat reveal">
        <h3>Tools</h3>
        <div className="skill-grid">
          {tools.map((s) => (
            <SkillChip key={s.name} {...s} />
          ))}
        </div>
      </div>

      <div className="skill-cat reveal">
        <h3>Electronics & Embedded Systems</h3>
        <div className="skill-grid">
          {electronics.map((s) => (
            <SkillChip key={s.name} {...s} />
          ))}
        </div>
      </div>
    </>
  )
}
