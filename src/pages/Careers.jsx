import React, { useEffect, useReducer, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import JobCard from '../components/jobs/JobCard';
import EmptyState from '../components/ui/States';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import { Input } from '../components/forms/Fields';
import { JOB_CATEGORIES, JOB_LOCATIONS, JOB_TYPES, filterJobs } from '../data/jobs';

function stateInit() {
  return { q: '', categories: [], locations: [], types: [] };
}

function stateReducer(state, action) {
  switch (action.kind) {
    case 'q':
      return { ...state, q: action.value };
    case 'toggle': {
      const list = state[action.list];
      return {
        ...state,
        [action.list]: list.includes(action.value) ? list.filter((v) => v !== action.value) : [...list, action.value],
      };
    }
    case 'reset':
      return stateInit();
    default:
      return state;
  }
}

export default function Careers() {
  const [filters, dispatch] = useReducer(stateReducer, undefined, stateInit);
  const [loading, setLoading] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulated fetch latency so loading states stay honest.
    const t = setTimeout(() => {
      setResults(filterJobs(filters));
      setLoading(false);
    }, 350);
    return () => clearTimeout(t);
  }, [filters]);

  const toggle = (list, value) => dispatch({ kind: 'toggle', list, value });
  const filterCount =
    filters.categories.length + filters.locations.length + filters.types.length + (filters.q ? 1 : 0);

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Careers' }]}
        title="Work that matters — join the A.eye team"
        subtitle="Licensed officers, monitoring specialists, response teams and event staff. Full training for the right attitude."
      />

      <section className="section">
        <div className="container">
          <div className="careers-toolbar">
            <form role="search" aria-label="Search jobs" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="search"
                placeholder="Search role, location or keyword…"
                aria-label="Search jobs by keyword"
                value={filters.q}
                onChange={(e) => dispatch({ kind: 'q', value: e.target.value })}
                style={{ maxWidth: 340 }}
              />
            </form>
            <Button variant="outline" size="sm" onClick={() => setMobileFilters(!mobileFilters)} aria-expanded={mobileFilters}>
              <Icon name="filter" size={15} />
              Filters
              {filterCount > 0 && (
                <span className="badge badge-amber" style={{ marginLeft: '0.35rem' }}>
                  {filterCount}
                </span>
              )}
            </Button>
          </div>

          <div className="careers-layout">
            <aside
              className={`card filter-card ${mobileFilters ? 'open' : ''}`.trim()}
              aria-label="Job filters"
            >
              <FilterGroup title="Category">
                {JOB_CATEGORIES.map((c) => (
                  <LabeledOption key={c} checked={filters.categories.includes(c)} onChange={() => toggle('categories', c)}>
                    {c}
                  </LabeledOption>
                ))}
              </FilterGroup>
              <FilterGroup title="Location">
                {JOB_LOCATIONS.map((l) => (
                  <LabeledOption key={l} checked={filters.locations.includes(l)} onChange={() => toggle('locations', l)}>
                    {l}
                  </LabeledOption>
                ))}
              </FilterGroup>
              <FilterGroup title="Employment type">
                {JOB_TYPES.map((t) => (
                  <LabeledOption key={t} checked={filters.types.includes(t)} onChange={() => toggle('types', t)}>
                    {t}
                  </LabeledOption>
                ))}
              </FilterGroup>
              {filterCount > 0 && (
                <button type="button" className="filter-reset" onClick={() => dispatch({ kind: 'reset' })}>
                  Reset all filters
                </button>
              )}
            </aside>

            <div className="jobs-list" aria-live="polite">
              <p className="jobs-count">
                <strong>{loading ? '…' : results.length}</strong> open position{results.length === 1 ? '' : 's'}
                {filterCount > 0 && ' match your filters'}
              </p>
              {loading ? (
                <div className="spinner-center" role="status" aria-label="Loading job listings">
                  <div className="spinner spinner-lg" />
                  <p>Loading job listings…</p>
                </div>
              ) : results.length === 0 ? (
                <EmptyState
                  icon="search"
                  title="No jobs match those filters"
                  sub="Try widening categories, clearing the search term, or check again next week — new posts open regularly."
                />
              ) : (
                results.map((job) => <JobCard key={job.id} job={job} />)
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup({ title, children }) {
  return (
    <fieldset className="fieldset">
      <legend className="filter-title">{title}</legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>{children}</div>
    </fieldset>
  );
}

function LabeledOption({ checked, onChange, children }) {
  return (
    <label className="filter-option">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {children}
    </label>
  );
}