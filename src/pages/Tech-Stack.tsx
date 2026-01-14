import { useNavigate } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'

export default function TechStackPage() {
    const navigate = useNavigate()

    return (
        <div className="certificates-page certificates-page--techstack">
            <div className="certificates-page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div>
                        <button className="back-button" onClick={() => navigate('/')}>
                            <HiArrowLeft className="back-icon" />
                            Back to Home
                        </button>
                    </div>
                    <h1 className="certificates-page-title">Tech Stack</h1>
                </div>
            </div>

            <div className="certificates-grid">
                <div className="certificate-card-grid">
                    <h2 className="section-title">Frontend</h2>
                    <div className="tech-tags" style={{ marginTop: 12 }}>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg" alt="JavaScript" className="tech-icon" /> JavaScript</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg" alt="TypeScript" className="tech-icon" /> TypeScript</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" alt="React" className="tech-icon" /> React</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg" alt="Next.js" className="tech-icon" /> Next.js</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vuedotjs.svg" alt="Vue.js" className="tech-icon" /> Vue.js</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg" alt="Tailwind CSS" className="tech-icon" /> Tailwind CSS</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sass.svg" alt="SCSS" className="tech-icon" /> SCSS</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/styledcomponents.svg" alt="Styled Components" className="tech-icon" /> Styled Components</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vite.svg" alt="Vite" className="tech-icon" /> Vite</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/webpack.svg" alt="Webpack" className="tech-icon" /> Webpack</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/eslint.svg" alt="ESLint" className="tech-icon" /> ESLint</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/prettier.svg" alt="Prettier" className="tech-icon" /> Prettier</span>
                    </div>
                </div>

                <div className="certificate-card-grid">
                    <h2 className="section-title">Backend</h2>
                    <div className="tech-tags" style={{ marginTop: 12 }}>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg" alt="Node.js" className="tech-icon" /> Node.js</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg" alt="Python" className="tech-icon" /> Python</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/java.svg" alt="Java" className="tech-icon" /> Java</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/php.svg" alt="PHP" className="tech-icon" /> PHP</span>
                        <span className="tech-tag">Express.js</span>
                        <span className="tech-tag">NestJS</span>
                        <span className="tech-tag">FastAPI</span>
                        <span className="tech-tag">Spring Boot</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/laravel.svg" alt="Laravel" className="tech-icon" /> Laravel</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg" alt="MySQL" className="tech-icon" /> MySQL</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/postgresql.svg" alt="Postgres" className="tech-icon" /> PostgreSQL</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg" alt="MongoDB" className="tech-icon" /> MongoDB</span>
                        <span className="tech-tag">DynamoDB</span>
                        <span className="tech-tag">OAuth</span>
                        <span className="tech-tag">JWT</span>
                        <span className="tech-tag">LDAP</span>
                        <span className="tech-tag">REST</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/graphql.svg" alt="GraphQL" className="tech-icon" /> GraphQL</span>
                        <span className="tech-tag">gRPC</span>
                        <span className="tech-tag">AWS Lambda</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg" alt="Firebase" className="tech-icon" /> Firebase</span>
                        <span className="tech-tag">PocketBase</span>
                    </div>
                </div>

                <div className="certificate-card-grid">
                    <h2 className="section-title">Mobile</h2>
                    <div className="tech-tags" style={{ marginTop: 12 }}>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flutter.svg" alt="Flutter" className="tech-icon" /> Flutter</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dart.svg" alt="Dart" className="tech-icon" /> Dart</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg" alt="React Native" className="tech-icon" /> React Native</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/expo.svg" alt="Expo" className="tech-icon" /> Expo</span>
                    </div>
                </div>

                <div className="certificate-card-grid">
                    <h2 className="section-title">Developer Tools</h2>
                    <div className="tech-tags" style={{ marginTop: 12 }}>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg" alt="Git" className="tech-icon" /> Git</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" alt="GitHub" className="tech-icon" /> GitHub</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gitlab.svg" alt="GitLab" className="tech-icon" /> GitLab</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bitbucket.svg" alt="Bitbucket" className="tech-icon" /> Bitbucket</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/visualstudiocode.svg" alt="VS Code" className="tech-icon" /> VS Code</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/trello.svg" alt="Trello" className="tech-icon" /> Trello</span>
                        <span className="tech-tag"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/jira.svg" alt="Jira" className="tech-icon" /> Jira</span>
                    </div>
                </div>
            </div>

            {/* Back link moved to header for better accessibility */}
        </div>
    )
}
