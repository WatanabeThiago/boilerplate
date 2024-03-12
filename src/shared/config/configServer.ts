import Config from "."
import bootstrap from "./bootstrap"
import cfonts from 'cfonts'

export default class App {
  async bootstrap(bannerName = global.environment.app.name) {
    cfonts.say(bannerName)
    const config = new Config(process.env.NODE_ENV)
    const environment = await config.bootstrap()
    const logger = config.logger()

    bootstrap(environment, logger)
  }

  async run(launcher) {
    await launcher.launch()
  }
}
