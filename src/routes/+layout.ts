import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createBrowserClient, createServerClient, isBrowser } from "@supabase/ssr"
import type { LayoutLoad } from "./$types"; // sveltekit specific type


export const ssr = false; // don't need ssr for this project


// load is typed to LayoutLoad
export const load: LayoutLoad = async ({ data, depends, fetch }) => {
    depends('supabase:auth') // tag supabase:auth determined by supabase which load function depends on

    // the two identifiers (params) tell it is a browser client for the specific supabase project
    // need to pass in some options into how the supabase client should be defined
    const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch, // property supabase is defining this in the background
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        // custom options for how cookies are handled
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

      const {
        data: { session },
      } = await supabase.auth.getSession() // return a data property 
    
      const {
        data: { user },
      } = await supabase.auth.getUser()
    
      // now we have access to supabase and session in any route we want 
      // (since in most external layout)
      return { session, supabase, user } // data that is sent to +layout.svelte
    }