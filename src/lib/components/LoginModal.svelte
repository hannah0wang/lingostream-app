<script lang="ts">
    import { Auth } from '@supabase/auth-ui-svelte';
    import { ThemeSupa, type SocialLayout, type ViewType } from '@supabase/auth-ui-shared';
    import { goto } from '$app/navigation';

    export let data;

    let { supabase, session } = data; // destructure these from data object
    $: ({ supabase, session } = data); // reactive statement - listen to changes 

    console.log(supabase);
    console.log(session);
    
    export let isModalOpen: boolean;

    const classes: { [key: string]: string } = {
		'rgb(202, 37, 37)': 'container-redshadow',
		'rgb(65, 163, 35)': 'container-greenshadow',
		'rgb(8, 107, 177)': 'container-blueshadow',
		'rgb(235, 115, 29)': 'container-orangeshadow'
	};

	const colors = [
		'rgb(202, 37, 37)',
		'rgb(65, 163, 35)',
		'rgb(8, 107, 177)',
		'rgb(235, 115, 29)'
	] as const;

	const socialAlignments = ['horizontal', 'vertical'] as const;

	const radii = ['5px', '10px', '20px'] as const;

	const views: { id: ViewType; title: string }[] = [
		{ id: 'sign_in', title: 'Sign In' },
		{ id: 'sign_up', title: 'Sign Up' },
		{ id: 'magic_link', title: 'Magic Link' },
		{ id: 'forgotten_password', title: 'Forgotten Password' },
		{ id: 'update_password', title: 'Update Password' },
		{ id: 'verify_otp', title: 'Verify Otp' }
	];

	let brandColor = colors[3];
	let socialLayout = socialAlignments[1] satisfies SocialLayout;
	let borderRadius = radii[1];
	let view = views[0];


    // ThemeVariables = {
    //     colors: {
    //         brand: 'rgb(155,71,156,255)',
    //         brandAccent: 'rgb(155,100,156,255)',
    //         brandButtonText: 'white',
    //         defaultButtonBackground: 'white',
    //         defaultButtonBackgroundHover: '#eaeaea',
    //         defaultButtonBorder: 'lightgray',
    //         defaultButtonText: 'gray',
    //         dividerBackground: '#eaeaea',
    //         inputBackground: 'transparent',
    //         inputBorder: 'lightgray',
    //         inputBorderHover: 'gray',
    //         inputBorderFocus: 'gray',
    //         inputText: 'black',
    //         inputLabelText: 'gray',
    //         inputPlaceholder: 'darkgray',
    //         messageText: 'gray',
    //         messageTextDanger: 'red',
    //         anchorTextColor: 'gray',
    //         anchorTextHoverColor: 'darkgray',
    //     },
    //     fontSizes: {
    //         baseBodySize: '13px',
    //         baseInputSize: '14px',
    //         baseLabelSize: '14px',
    //         baseButtonSize: '14px',
    //     },
    //     fonts: {
    //         bodyFontFamily: `ui-sans-serif, sans-serif`,
    //         buttonFontFamily: `ui-sans-serif, sans-serif`,
    //         inputFontFamily: `ui-sans-serif, sans-serif`,
    //         labelFontFamily: `ui-sans-serif, sans-serif`,
    //     },
    //     borderWidths: {
    //         buttonBorderWidth: '2px',
    //         inputBorderWidth: '2px',
    //     },

    //     radii: {
    //         borderRadiusButton: '15px',
    //         buttonBorderRadius: '15px',
    //         inputBorderRadius: '15px',
    //     },
    // };

</script>

<dialog class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box max-w-xl">
		<form method="dialog" >
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={() => isModalOpen = false}>✕</button>
		</form>
        <div>
            <h1 class="font-bold text-2xl py-3">Welcome Back!</h1>
        </div>
        <div class="h-full overflow-y-auto">
            <Auth
							supabaseClient={supabase}
							theme="default"
							view={view.id}
							appearance={{
								theme: ThemeSupa,
								style: {
									button: `border-radius: ${borderRadius}; border-color: rgba(0,0,0,0);`
								},
								variables: {
                        default: {
                            colors: {
                                brand: 'rgb(125,47,143,1)',
                                brandAccent: 'rgb(125,30,143,1)',
                                inputText: 'black',
                                inputBackground: 'lightgray',
                                inputLabelText: 'gray',
                            },
                            radii: {
                                borderRadiusButton: '15px',
                                buttonBorderRadius: '15px',
                                inputBorderRadius: '15px'
                            },
                            fontSizes: {
                                baseBodySize: '13px',
                                baseInputSize: '14px',
                                baseLabelSize: '14px',
                                baseButtonSize: '14px',
                            },
                        }
                    }
							}}
							providers={['google', 'apple']}
							{socialLayout}
						/>
            <!-- <Auth
                supabaseClient={supabase}
                theme="default"
                appearance={{
                    theme: ThemeSupa,
                    style: {
                        button: 'border-radius: 15px; border-color: rgba(0,0,0,0);'
                    },
                    variables: {
                        default: {
                            colors: {
                                brand: 'rgb(155,71,156,255)',
                                brandAccent: 'rgb(155,100,156,255)',
                                inputText: 'black',
                                inputBackground: 'lightgray',
                                inputLabelText: 'gray',
                            },
                            radii: {
                                borderRadiusButton: '15px',
                                buttonBorderRadius: '15px',
                                inputBorderRadius: '15px'
                            },
                            fontSizes: {
                                baseBodySize: '13px',
                                baseInputSize: '14px',
                                baseLabelSize: '14px',
                                baseButtonSize: '14px',
                            },
                        }
                    }
                }}>
            </Auth> -->
        </div>
	</div>
</dialog>