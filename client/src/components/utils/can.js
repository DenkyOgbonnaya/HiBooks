import rules from '../../rbac_rules.';

const check = (rule, role, action) => {
    const permission = rules[role];
    if(!permission) return false;

    return permission.includes(action);
}
const Can = props =>
    check(rules, props.role, props.perform) 
    ? props.yes()
    : props.no();

    Can.defaultProps = {
        yes: () => null,
        no: () => null
    };


export default Can;