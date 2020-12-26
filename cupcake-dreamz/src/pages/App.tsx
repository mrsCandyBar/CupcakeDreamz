import React from 'react';
import Svg from '../components/svg';
import SvgTemplate from '../components/svgTemplate';
import { Grid, withStyles, Typography, Button } from '@material-ui/core';
import { findIndex, get, set, isArray } from 'lodash';
import { pageStyles } from '../assets/styles/layout';
import Countdown from '../components/countdown';
import Confetti from '../components/confetti';
import { CupcakeModel, CupcakeCreatorModel } from '../models';
import DisplayIngredients from '../components/displayIngredients';
import Preview from '../components/preview';
import Timer from '../components/timer';
import '../assets/styles/styles.css';

interface IAppProps { classes: any }
interface IAppState {
  classes: any,
  cupcake: CupcakeModel,
  matchCupcake?: CupcakeModel,
  options: CupcakeCreatorModel,
  timeOut: boolean,
  leftAlignSvg: any,
  rightAlignSvg: any,
  success: Array<CupcakeModel>,
  countDown: number
}

class App extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      classes: this.props.classes,
      cupcake: new CupcakeModel(),
      matchCupcake: undefined,
      options: new CupcakeCreatorModel(),
      timeOut: true,
      leftAlignSvg: {
        width: '200%',
        height: '100%',
        viewBox: '0 0 450 600'
      },
      rightAlignSvg: {
        width: '200%',
        height: '100%',
        viewBox: '225 0 450 600',
        preserveAspectRatio: 'xMinYMid meet'
      },
      success: [],
      countDown: 10
    }
  }

  componentDidMount = () => {
    this.generateRandomCupcake();
  }

  private generateRandomCupcake = () => {
    const getOptions: any = this.state.options;
    let newCupcake: any = {};

    Object.keys(getOptions).forEach((optionType) => {
      if (isArray(getOptions[optionType])) {
        const randomNumber = Math.floor(Math.random() * getOptions[optionType].length);
        return newCupcake[optionType] = getOptions[optionType][randomNumber];

      } else {
        newCupcake[optionType] = {};
        Object.keys(getOptions[optionType]).map((innerObjectType) => {
          const innerRandomNumber = Math.floor(Math.random() * getOptions[optionType][innerObjectType].length);
          return newCupcake[optionType][innerObjectType] = getOptions[optionType][innerObjectType][innerRandomNumber];
        });
      }
    });

    this.setState({
      ...this.state,
      success: this.state.matchCupcake ? [...this.state.success, this.state.matchCupcake] : [],
      matchCupcake: { ...newCupcake },
      timeOut: false
    });
  }

  private swapOut = (optionType: any) => {
    const { options, cupcake } = this.state;
    const allOptions = get(options, optionType);
    const selectedOption = get(cupcake, optionType);
    const activeIndex = findIndex(allOptions, (option: any) => option === selectedOption);

    let updateState = cupcake;
    set(updateState, optionType, allOptions[(activeIndex == allOptions.length - 1) ? 0 : activeIndex + 1]);

    this.setState({
      ...this.state,
      cupcake: { ...updateState }
    });
  }

  private toggleTimeout = () => {
    this.setState({
      ...this.state,
      timeOut: true
    });
  }

  private isEqualCupcake = () => {
    const { cupcake, matchCupcake }: any = this.state;
    let isEqual = true;
    matchCupcake ? (
      Object.keys(cupcake).forEach((mainKey: any) => {
        if (typeof cupcake[mainKey] === 'object') {
          Object.keys(cupcake[mainKey]).forEach((key: any) => {
            if (cupcake[mainKey][key] != matchCupcake[mainKey][key]) {
              isEqual = false;
            }
          });
        } else {
          if (cupcake[mainKey] != matchCupcake[mainKey]) {
            isEqual = false;
          }
        }
      })

    ) : isEqual = false;

    return isEqual;
  }

  private restartGame = () => {
    this.setState({
      ...this.state,
      matchCupcake: undefined,
      countDown: 60,
      success: []
    });

    setTimeout(() => {
      this.generateRandomCupcake();
    }, 1000)
  }


  private callTime = (time: number) => {
    this.setState({
      ...this.state,
      countDown: time
    });
  }

  render() {
    const { cupcake, matchCupcake, timeOut, leftAlignSvg, rightAlignSvg, classes, countDown } = this.state;
    const { flavour, holder, icing, sprinkles, topping, optional } = cupcake;
    const congratsAreInFavour = this.isEqualCupcake();
    const previewCupcake = matchCupcake ? {
      ...matchCupcake,
      flavour: undefined,
      holder: { ...matchCupcake.holder, colour: undefined },
      icing: { ...matchCupcake.icing, colour: undefined },
      sprinkles: { ...matchCupcake.sprinkles, colour: undefined }
    } : {}

    const game = (
      <Grid container className={`${classes.container} ${classes.maxScreen}`} alignContent="space-between" alignItems="center" justify="space-between">

        <Timer getTimeParams={this.callTime} successfull={congratsAreInFavour} />

        {((countDown !== 0) && matchCupcake) ? (
          <React.Fragment>
            <Preview img={previewCupcake} updateClass={congratsAreInFavour}>
              <SvgTemplate visible={cupcake} name="cupcake" />
              <SvgTemplate visible={matchCupcake} name="match" />
              <SvgTemplate visible={previewCupcake} name="preview" />
            </Preview>

            <Grid item xs={12}>
              {congratsAreInFavour && (
                <React.Fragment>
                  <Confetti toggleTimeout={this.toggleTimeout} canToggle={congratsAreInFavour} />
                  {timeOut && <Countdown generateNewCupcake={this.generateRandomCupcake} />}
                </React.Fragment>
              )}

              <Grid container>
                <Grid item xs={6} className={`${classes.imgLarge} ${classes.halfSvg} ${congratsAreInFavour && 'bigger'}`}>
                  <Svg visible={{ ...cupcake, svg: leftAlignSvg }} name="cupcake" />
                </Grid>
                <Grid item xs={6} className={`${classes.imgLarge} ${classes.halfSvg} ${congratsAreInFavour && 'bigger'}`}>
                  <Svg visible={{ ...matchCupcake, svg: rightAlignSvg }} name="match" />
                </Grid>
              </Grid>
            </Grid>

            <Grid container className={`${classes.container}`} alignContent="space-between" alignItems="center" justify="space-between">
              <DisplayIngredients
                ingredients={[{ action: congratsAreInFavour ? undefined : () => this.swapOut('flavour'), visible: { flavour } }]}
                updateClass={congratsAreInFavour}
              />

              <DisplayIngredients
                ingredients={[
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('holder.type'), visible: { holder: { type: holder.type }, svg: leftAlignSvg } },
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('holder.colour'), visible: { holder: { type: holder.type, colour: holder.colour }, svg: rightAlignSvg } }]}
                updateClass={congratsAreInFavour}
              />

              <DisplayIngredients
                ingredients={[
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('icing.type'), visible: { icing: { type: icing.type }, svg: leftAlignSvg } },
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('icing.colour'), visible: { icing: { type: icing.type, colour: icing.colour }, svg: rightAlignSvg } }]}
                updateClass={congratsAreInFavour}
              />

              <DisplayIngredients
                ingredients={[
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('sprinkles.type'), visible: { sprinkles: { type: sprinkles.type }, svg: leftAlignSvg } },
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('sprinkles.colour'), visible: { sprinkles: { type: sprinkles.type, colour: sprinkles.colour }, svg: rightAlignSvg } }]}
                updateClass={congratsAreInFavour}
              />

              <DisplayIngredients
                ingredients={[
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('optional'), visible: { icing: { type: icing.type }, topping: topping, optional: optional, svg: leftAlignSvg } },
                  { action: congratsAreInFavour ? undefined : () => this.swapOut('topping'), visible: { icing: { type: icing.type }, topping: topping, optional: optional, svg: rightAlignSvg } }]}
                updateClass={congratsAreInFavour}
              />
            </Grid>
          </React.Fragment>

        ) : (
            <Grid container className={classes.container} alignContent="space-between" alignItems="center" justify="center">
              <Grid item xs={12}>
                <Typography>
                  Game over
                </Typography>

                <Button onClick={this.restartGame}>
                  Give it another go?
                </Button>

              </Grid>
            </Grid>
          )}
      </Grid >
    )

    return matchCupcake ? game : 'loading';
  }
}

export default withStyles(pageStyles)(App);