import { IFormModuleRootState, IFormModuleState } from 'plugin/state/FormStateModule';
import React, { FC } from 'react';
import { FormBuilder } from 'react-formio';
import { connect } from "react-redux";
import { useInRouterContext } from 'react-router-dom';


const FormEditor: FC<any> = ({
    activeForm
}: IFormModuleState) => {

    const inRouterContext = useInRouterContext();
    console.log(`FormEditor in router context: ${inRouterContext}`);

    const showActiveFormOrNot = () => {
        if (activeForm) {
            return (
                <FormBuilder
                    form={{ display: 'form' }}
                    onChange={(schema: any) => console.log(schema)}
                />
            )
        } else {
            return (<h1>There is no active form</h1>)
        }
    }
    return (
        <div>
            {showActiveFormOrNot()}
        </div>
    )
}

const mapStateToProps = (state: IFormModuleRootState) => {
    console.log(state);
    return {
        activeForm: state.formModuleState.activeForm
    };
};

export default connect(mapStateToProps)(FormEditor);
